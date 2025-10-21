/* eslint-disable no-else-return */
import { FontAwesome5 } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  PixelRatio,
  StyleSheet,
  View,
  Platform,
  Text,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
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
  MarkerContainer,
  MarkerStoreName,
  SearchBar,
} from '../../styled/store';

export default function MapScreen(props) {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const stores = useStores();

  const [_stores, setStores] = useState();
  const [region, setRegion] = useState(initialRegion);
  const [currentStore, setCurrentStore] = useState(null);
  const [mapFilterObj, setMapFilterObj] = useState();
  const [filteredStores, setFilteredStores] = useState([]);
  // const [androidPermission, setAndroidPermission] = useState(false);

  const storeProducts = useStoreProducts(currentStore);
  const { locationPermissions, currentLocation } = useCurrentLocation();

  // eslint-disable-next-line no-underscore-dangle
  const _showDefaultStore =
    locationPermissions !== 'granted' ||
    (stores.length > 0 && !stores[0].distance);

  const [showDefaultStore, setDefaultStore] = useState(_showDefaultStore);

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  // prevent multiple auto-centers
  const didPickInitialRef = useRef(false);
  // Helpers
  const isFiniteCoord = (lat, lng) =>
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180;

  const nearestStore = (userLoc, items) => {
    if (!userLoc || !isFiniteCoord(userLoc.latitude, userLoc.longitude))
      return null;
    let best = null;
    let bestDist = Infinity;
    items.forEach((s) => {
      const lat = Number(s.latitude);
      const lng = Number(s.longitude);
      if (isFiniteCoord(lat, lng)) {
        const d = findStoreDistance(userLoc, s);
        if (typeof d === 'number' && d < bestDist) {
          bestDist = d;
          best = s;
        }
      }
    });
    return { store: best, km: bestDist };
  };

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
    // Pick initial store ONCE with guards (avoid 0,0)
    if (!didPickInitialRef.current && filteredStoresCopy.length > 0) {
      didPickInitialRef.current = true;
      if (
        locationAccess &&
        currentLocation &&
        isFiniteCoord(currentLocation.latitude, currentLocation.longitude)
      ) {
        const result = nearestStore(currentLocation, filteredStoresCopy);
        const candidate =
          result && result.store && result.km <= 25
            ? result.store
            : filteredStoresCopy.find((s) =>
                isFiniteCoord(Number(s.latitude), Number(s.longitude))
              ) || filteredStoresCopy[0];
        if (candidate) changeCurrentStore(candidate, true, true);
      } else {
        const firstValid =
          filteredStoresCopy.find((s) =>
            isFiniteCoord(Number(s.latitude), Number(s.longitude))
          ) || filteredStoresCopy[0];
        changeCurrentStore(firstValid, true, true);
      }
    }
  }, [mapFilterObj, _stores, locationPermissions, currentLocation]); // eslint-disable-line

  useEffect(() => {
    const fetchUser = async () => {
      await getAsyncCustomerAuth();
    };
    // if (Platform.OS === 'android') {
    //   PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //   )
    //     .then((granted) => {
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         setAndroidPermission(true);
    //       }
    //     })
    //     .catch((e) => console.log(e));
    // } else {
    //   setAndroidPermission(true);
    // }

    fetchUser();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (props.route.params) {
      const store = props.route.params.currentStore;
      if (Object.keys(store).length) {
        didPickInitialRef.current = true; // ensure we don't auto-pick again
        changeCurrentStore(store);
      }
    }
  }, [stores, props.route.params]);

  // Update the current store and map region.
  // Only expand (reset) the bottom sheet to display products if navigated from StoreList

  const changeCurrentStore = async (
    store,
    resetSheet = false,
    animate = true
  ) => {
    // Analytics.logEvent('view_store_products', {
    //   store_name: store ? store.storeName : '',
    //   products_in_stock:
    //     store && 'productIds' in store ? store.productIds.length : 0,
    // });
    const factor = 0.2;
    const lat = store ? Number(store.latitude) : NaN;
    const lng = store ? Number(store.longitude) : NaN;
    const hasValidCoords = isFiniteCoord(lat, lng);
    const newRegion = {
      latitude: hasValidCoords ? lat : region.latitude,
      longitude: hasValidCoords ? lng : region.longitude,
      latitudeDelta: hasValidCoords
        ? deltas.latitudeDelta * factor
        : region.latitudeDelta,
      longitudeDelta: hasValidCoords
        ? deltas.longitudeDelta * factor
        : region.longitudeDelta,
    };
    setCurrentStore(store);

    if (resetSheet) {
      bottomSheetRef.current.snapTo(1);
    }
    if (
      animate &&
      newRegion &&
      isFiniteCoord(newRegion.latitude, newRegion.longitude)
    ) {
      await mapRef.current?.animateToRegion(newRegion, 1000);
    } else {
      setRegion(newRegion);
    }
  };

  const getImageSource = (focused) => {
    let imageSource;
    if (mapFilterObj?.couponProgramPartner && mapFilterObj?.wic) {
      imageSource = focused
        ? require('../../assets/images/mix/map/Marker_Focused_snap_wic_2x.png')
        : require('../../assets/images/mix/map/Marker_Regular_snap_wic_2x.png');
    } else if (mapFilterObj?.couponProgramPartner) {
      imageSource = focused
        ? require('../../assets/images/mix/map/Marker_Focused_snap_2x.png')
        : require('../../assets/images/mix/map/Marker_Regular_snap_2x.png');
    } else if (mapFilterObj?.wic) {
      imageSource = focused
        ? require('../../assets/images/mix/map/Marker_Focused_wic_2x.png')
        : require('../../assets/images/mix/map/Marker_Regular_wic_2x.png');
    } else {
      imageSource = focused
        ? require('../../assets/images/mix/map/Marker_Focused_2x.png')
        : require('../../assets/images/mix/map/Marker_Regular_2x.png');
    }
    return imageSource;
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
      {stores.length !== 0 && (
        <MapView
          style={{
            marginTop: -200,
            flex: 100,
          }}
          rotateEnabled={false}
          loadingEnabled
          ref={mapRef}
          mapType="standard"
          initialRegion={region}
          showsUserLocation
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}>
          {/* Display Non-focused store markers */}
          {filteredStores
            .filter((store) => currentStore.id !== store.id)
            .map((store) => (
              <Marker
                key={store.id}
                coordinate={{
                  latitude: store.latitude ? Number(store.latitude) : 0,
                  longitude: store.longitude ? Number(store.longitude) : 0,
                }}
                tracksInfoWindowChanges
                zIndex={currentStore?.id === store.id ? 2 : 1}
                {...(Platform.OS === 'android'
                  ? {
                      icon: getImageSource(
                        currentStore && currentStore.id === store.id
                      ),
                    }
                  : {})}
                onPress={() => changeCurrentStore(store)}>
                {Platform.OS === 'ios' && (
                  <StoreMarker
                    showName={region.longitudeDelta < 0.07}
                    storeName={store.storeName ?? ''}
                    focused={currentStore && currentStore.id === store.id}
                    wic={mapFilterObj?.wic}
                    couponProgramPartner={mapFilterObj.couponProgramPartner}
                  />
                )}
              </Marker>
            ))}
          {/* Display Focused store markers */}
          {filteredStores
            .filter((store) => currentStore && currentStore.id === store.id)
            .map((store) => (
              <Marker
                key={store.id}
                tracksInfoWindowChanges
                coordinate={{
                  latitude: store.latitude ? Number(store.latitude) : 0,
                  longitude: store.longitude ? Number(store.longitude) : 0,
                }}
                zIndex={currentStore?.id === store.id ? 2 : 1}
                {...(Platform.OS === 'android'
                  ? {
                      icon: getImageSource(
                        currentStore && currentStore.id === store.id
                      ),
                    }
                  : {})}
                onPress={() => changeCurrentStore(store)}>
                {Platform.OS === 'ios' && (
                  <StoreMarker
                    showName={region.longitudeDelta < 0.07}
                    storeName={store.storeName ?? ''}
                    focused={currentStore && currentStore.id === store.id}
                    wic={mapFilterObj?.wic}
                    couponProgramPartner={mapFilterObj?.couponProgramPartner}
                  />
                )}
              </Marker>
            ))}
        </MapView>
      )}
      {/* Display bottom sheet.
            snapPoints: Params representing the resting positions of the bottom sheet relative to the bottom of the screen. */}

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: 'black' }}
        backgroundStyle={{ backgroundColor: 'white' }}>
        <View
          style={{
            flex: 1,

            alignItems: 'center',
          }}>
          <View>
            {!showDefaultStore && currentLocation && (
              <CenterLocation
                callBack={async () => {
                  // Analytics.logEvent('center_location', {
                  //   purpose: 'Centers map to current location',
                  // });
                  await mapRef.current?.animateToRegion(currentLocation, 1000);
                }}
              />
            )}
          </View>
          <BottomSheetContainer>
            {currentStore && (
              <StoreProducts
                navigation={props.navigation}
                store={currentStore}
                products={storeProducts}
              />
            )}
          </BottomSheetContainer>
        </View>
      </BottomSheet>

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
