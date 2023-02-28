/* eslint-disable no-else-return */
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  PixelRatio,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  NavHeaderContainer,
  Subtitle,
  Title,
} from '../../components/BaseComponents';
import CenterLocation from '../../components/CenterLocation';
import Hamburger from '../../components/Hamburger';
import MapFilterBlank from '../../components/map/MapFilterBlank';
import MapFilterOptions from '../../components/map/MapFilterOptions';
import StoreProducts from '../../components/product/StoreProducts';
import StoreMarker from '../../components/store/StoreMarker';
import Colors from '../../constants/Colors';
import { deltas, initialRegion } from '../../constants/Map';
import { getAsyncCustomerAuth } from '../../lib/authUtils';
import {
  findStoreDistance,
  getAsyncStorageMapFilters,
  setInitialAsyncStorageMapFilters,
  sortByDistance,
  useCurrentLocation,
  useStoreProducts,
  useStores,
} from '../../lib/mapUtils';
import {
  BottomSheetContainer,
  BottomSheetHeaderContainer,
  DragBar,
  SearchBar,
} from '../../styled/store';

const snapPoints = [185, 325, 488];
export default function MapScreen(props) {
  const stores = useStores();

  const [_stores, setStores] = useState();
  const [region, setRegion] = useState(initialRegion);
  const [currentStore, setCurrentStore] = useState(null);
  const [mapFilterObj, setMapFilterObj] = useState();
  const [filteredStores, setFilteredStores] = useState([]);
  const [androidPermission, setAndroidPermission] = useState(false);

  const storeProducts = useStoreProducts(currentStore);
  const { locationPermissions, currentLocation } = useCurrentLocation();

  const _showDefaultStore =
    locationPermissions !== 'granted' ||
    (stores.length > 0 && !stores[0].distance);

  const [showDefaultStore, setDefaultStore] = useState(_showDefaultStore);

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      getAsyncStorageMapFilters().then((initialMapFilters) => {
        if (initialMapFilters) {
          setMapFilterObj(initialMapFilters);
        } else {
          setInitialAsyncStorageMapFilters().then((mapFilters) => {
            setMapFilterObj(mapFilters);
          });
        }
      });
    }, [])
  );

  useEffect(() => {
    // sort by distance
    stores.forEach((store) => {
      const currStore = store;
      currStore.distance = findStoreDistance(currentLocation, store);
    });
    stores.sort((a, b) => sortByDistance(a, b)); // ! sorted by location here
    setStores(stores);
    setDefaultStore(
      locationPermissions !== 'granted' ||
        (stores.length > 0 && !stores[0].distance)
    );
  }, [stores, locationPermissions]); // eslint-disable-line

  useEffect(() => {
    // if default store go to store
    // else go to closest store
    if (!_stores || !mapFilterObj) return;

    // check for location permissions
    const locationAccess = locationPermissions === 'granted';

    // check for user default store
    let filteredStoresCopy = _stores;
    if (mapFilterObj) {
      filteredStoresCopy = _stores.filter((item) => {
        const wicPass = item.wic === mapFilterObj.wic || !mapFilterObj.wic;
        const snapPass =
          item.couponProgramPartner === mapFilterObj.couponProgramPartner ||
          !mapFilterObj.couponProgramPartner;
        return wicPass && snapPass;
      });
      setFilteredStores(filteredStoresCopy);
    }
    if (!locationAccess) {
      changeCurrentStore(filteredStoresCopy[0], true, false);
    }
  }, [mapFilterObj, _stores]); // eslint-disable-line

  useEffect(() => {
    const fetchUser = async () => {
      await getAsyncCustomerAuth();
    };
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
        .then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setAndroidPermission(true);
          }
        })
        .catch((e) => console.log(e));
    } else {
      setAndroidPermission(true);
    }

    fetchUser();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (props.route.params) {
      const store = props.route.params.currentStore;
      if (Object.keys(store).length) {
        changeCurrentStore(store);
      }
    } else {
      changeCurrentStore(stores[0]);
    }
  }, [stores, props.route.params]);

  // Update the current store and map region.
  // Only expand (reset) the bottom sheet to display products if navigated from StoreList

  const changeCurrentStore = async (
    store,
    resetSheet = false,
    animate = true
  ) => {
    Analytics.logEvent('view_store_products', {
      store_name: store ? store.storeName : '',
      products_in_stock:
        store && 'productIds' in store ? store.productIds.length : 0,
    });

    const newRegion = {
      latitude: store
        ? store.latitude - deltas.latitudeDelta / 3.5
        : region.latitude,
      longitude: store ? store.longitude : region.longitude,
      ...deltas,
    };
    setCurrentStore(store);

    if (resetSheet) {
      bottomSheetRef.current.snapTo(1);
    }
    if (animate) {
      await mapRef.current.animateToRegion(newRegion, 1000);
    } else {
      setRegion(newRegion);
    }
  };

  const renderContent = () => {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
          }}>
          {!showDefaultStore && (
            <CenterLocation
              callBack={async () => {
                Analytics.logEvent('center_location', {
                  purpose: 'Centers map to current location',
                });
                await mapRef.current.animateToRegion(currentLocation, 1000);
              }}
            />
          )}
        </View>
        <BottomSheetContainer>
          <BottomSheetHeaderContainer>
            <DragBar />
          </BottomSheetHeaderContainer>
          {currentStore && (
            <StoreProducts
              navigation={props.navigation}
              store={currentStore}
              products={storeProducts}
            />
          )}
        </BottomSheetContainer>
      </View>
    );
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <NavHeaderContainer
        noShadow
        backgroundColor="transparent"
        style={{
          zIndex: 1,
        }}>
        {/* Map Options - Hamburger Button */}
        <Hamburger navigation={props.navigation} />

        {/* Display search bar */}
        <SearchBar
          onPress={() => props.navigation.navigate('StoreList', { stores })}>
          <FontAwesome5
            name="search"
            size={16 * Math.min(PixelRatio.getFontScale(), 1.4)}
            color={Colors.primaryOrange}
            style={{ marginLeft: 12, marginRight: 12 }}
          />
          <Subtitle color={Colors.secondaryText} style={{ marginRight: 12 }}>
            Find a store
          </Subtitle>
        </SearchBar>

        {/* Map Filter */}
        <MapFilterBlank />
        {/* <MapFilter
          toggleMapFilterOptions={() =>
            setShowMapFilterOptions(!showMapFilterOptions)
          }
        /> */}
      </NavHeaderContainer>
      <View
        style={{
          zIndex: 1,
          marginLeft: 12,
        }}>
        <MapFilterOptions setMapFilterObj={setMapFilterObj} />
      </View>

      {/* Display Map */}
      <MapView
        style={{
          marginTop: -170,
          flex: 100,
          zIndex: -1,
        }}
        rotateEnabled={false}
        loadingEnabled
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={mapRef}
        mapType="standard"
        initialRegion={region}
        showsUserLocation={androidPermission}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}>
        {/* Display Non-focused store markers */}
        {filteredStores
          .filter((store) => currentStore.id !== store.id)
          .map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              onPress={() => changeCurrentStore(store)}>
              <StoreMarker
                showName={region.longitudeDelta < 0.07}
                storeName={store.storeName ?? ''}
                focused={currentStore && currentStore.id === store.id}
                wic={mapFilterObj.wic}
                couponProgramPartner={mapFilterObj.couponProgramPartner}
              />
            </Marker>
          ))}
        {/* Display Focused store markers */}
        {filteredStores
          .filter((store) => currentStore && currentStore.id === store.id)
          .map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              onPress={() => changeCurrentStore(store)}>
              <StoreMarker
                showName={region.longitudeDelta < 0.07}
                storeName={store.storeName ?? ''}
                focused={currentStore && currentStore.id === store.id}
                wic={mapFilterObj.wic}
                couponProgramPartner={mapFilterObj.couponProgramPartner}
              />
            </Marker>
          ))}
      </MapView>
      {/* Display bottom sheet.
            snapPoints: Params representing the resting positions of the bottom sheet relative to the bottom of the screen. */}
      <View style={{ flex: 1, marginBottom: 20 }}>
        <BottomSheet
          initialSnap={1}
          enabledInnerScrolling={false}
          enabledBottomClamp
          overdragResistanceFactor={1}
          enabledContentTapInteraction={false}
          snapPoints={snapPoints}
          renderContent={renderContent}
          ref={bottomSheetRef}
        />
      </View>
      {/* request hide healthy rewards */}

      {/* <RewardsFooter navigation={props.navigation} /> */}
      {(!locationPermissions || stores.length === 0) && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 200,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,.5)',
          }}>
          <Title style={{ marginBottom: 24 }}>Loading stores</Title>
          <ActivityIndicator size="large" color={Colors.bgDark} />
        </View>
      )}
    </View>
  );
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
