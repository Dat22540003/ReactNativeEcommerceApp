import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductScreen from '../screens/ProductScreen';
import { useSelector } from 'react-redux';

const addingCategory = [
    {
        _id: '0',
        title: 'All',
    },
];

const Tab = createMaterialTopTabNavigator();

const CategoryTopTab = () => {
    const categories = useSelector((state) => state.app.categories);
    const allCategories = addingCategory.concat(categories);

    return (
        <Tab.Navigator>
            {allCategories.length > 0 &&
                allCategories.map((item) => {
                    return (
                        <Tab.Screen
                            key={item?._id}
                            // key={item?._id}
                            name={item?.title}
                            children={() => {
                                return <ProductScreen category={item?.title} />;
                            }}
                            options={{
                                tabBarIcon: () => (
                                    <View>
                                        {item?.image ? (
                                            <Image
                                                style={styles.image}
                                                source={{
                                                    uri: item?.image,
                                                }}
                                            />
                                        ) : null}
                                    </View>
                                ),
                                tabBarScrollEnabled: true,
                                tabBarActiveTintColor: '#EE3131',
                                tabBarInactiveTintColor: '#B0B0B0',
                                tabBarIndicatorStyle: {
                                    backgroundColor: '#EE3131',
                                },
                                tabBarLabelStyle: {
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                },
                                tabBarIconStyle: { width: 32, height: 32 },
                            }}
                        />
                    );
                })}
        </Tab.Navigator>
    );
};

export default CategoryTopTab;

const styles = StyleSheet.create({
    image: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
});
