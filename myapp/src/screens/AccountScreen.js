import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/user/userSlice';
import AntDesign from '@expo/vector-icons/AntDesign';
import PersonalInfomation from '../components/personalAccount/PersonalInfomation';
import CartDetailScreen from './CartDetailScreen';
import { images } from '../../assets';

import UserList from '../components/adminAccount/UserList';

const AccountScreen = () => {
    const dispatch = useDispatch();
    const current = useSelector((state) => state.user.current);
    const [isShowUserWorkspace, setIsShowUserWorkspace] = useState(true);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <TouchableOpacity
                    style={styles.rightContent}
                    onPress={handleLogout}
                >
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.leftContent}>
                    <View style={styles.inforWrapper}>
                        <Text
                            style={[styles.text, styles.boldText]}
                        >{`${current?.firstname} ${current?.lastname}`}</Text>
                        <Text style={[styles.text, styles.italicText]}>
                            {current?.role === '1999' ? 'Admin' : 'User'}
                        </Text>
                    </View>
                    <Image
                        source={
                            current?.avatar
                                ? { uri: `${current?.avatar}` }
                                : images.avatar
                        }
                        style={styles.avt}
                    />
                </View>
            </View>

            <View style={styles.bottomWrapper}>
                <View style={styles.ctrlWrapper}>
                    <TouchableOpacity
                        style={[
                            styles.btn,
                            isShowUserWorkspace && styles.activeBtn,
                        ]}
                        onPress={() => setIsShowUserWorkspace(true)}
                    >
                        <Text
                            style={[
                                styles.text,
                                isShowUserWorkspace && styles.whiteText,
                            ]}
                        >
                            User workspace
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.btn,
                            !isShowUserWorkspace && styles.activeBtn,
                        ]}
                        onPress={() => setIsShowUserWorkspace(false)}
                    >
                        <Text
                            style={[
                                styles.text,
                                !isShowUserWorkspace && styles.whiteText,
                            ]}
                        >
                            Admin workspace
                        </Text>
                    </TouchableOpacity>
                </View>
                {isShowUserWorkspace ? (
                    <KeyboardAvoidingView
                        style={styles.scrBottomWrapper}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={
                            Platform.OS === 'ios' ? 144 : 144
                        }
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.scrBottomItem}>
                                    <View style={styles.titleWrapper}>
                                        <Text
                                            style={[
                                                styles.text,
                                                styles.boldText,
                                            ]}
                                        >
                                            Personal Information
                                        </Text>
                                    </View>
                                    <PersonalInfomation currentUser={current} />
                                </View>
                                <View style={styles.scrBottomItem}>
                                    <View style={styles.titleWrapper}>
                                        <Text
                                            style={[
                                                styles.text,
                                                styles.boldText,
                                            ]}
                                        >
                                            Cart
                                        </Text>
                                    </View>
                                    <CartDetailScreen />
                                </View>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                ) : (
                    <KeyboardAvoidingView
                        style={styles.scrBottomWrapper}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={
                            Platform.OS === 'ios' ? 144 : 144
                        }
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                            >
                                <View style={styles.scrBottomItem}>
                                    <View style={styles.titleWrapper}>
                                        <Text
                                            style={[
                                                styles.text,
                                                styles.boldText,
                                            ]}
                                        >
                                            Manage Users
                                        </Text>
                                    </View>
                                    <UserList />
                                </View>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
    },
    topWrapper: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: 60,
        paddingHorizontal: 8,

        backgroundColor: '#f0f0f0',
    },
    rightContent: {
        width: 46,
        height: 46,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        alignItems: 'center',
    },
    inforWrapper: {
        flexDirection: 'column',
        height: 46,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    avt: { width: 46, height: 46, borderRadius: 50 },

    bottomWrapper: {
        flex: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 26,
    },
    ctrlWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    btn: {
        width: '48%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 26,
    },

    activeBtn: {
        backgroundColor: '#ee3131',
    },

    scrBottomWrapper: {
        flex: 1,
        width: '100%',
    },
    scrBottomItem: {
        position: 'relative',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 52,
        borderRadius: 26,
        marginBottom: 12,
    },
    titleWrapper: {
        position: 'absolute',
        backgroundColor: '#d0d0d0',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderTopLeftRadius: 26,
        borderBottomRightRadius: 26,
    },
    whiteText: { color: 'white' },
    text: { fontSize: 16 },
    boldText: { fontWeight: 'bold' },
    italicText: { fontStyle: 'italic' },
});

export default AccountScreen;
