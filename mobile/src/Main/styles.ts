import {Platform, StatusBar} from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS==='android';

// SafeAreaView is like a view but the content is shown below the status bar(on IOS) but on android we need to get the status bar height
// and set is as margin top
export const Container = styled.SafeAreaView`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px`: '0'};
    flex: 1;

    background: #fafafa;
`;

export const CategoriesContainer = styled.View`
    height: 72px;
    margin-top: 34px;
`;

export const MenuContainer = styled.View`
    flex: 1;
`;

export const Footer = styled.View`
    min-height: 110px;
    background: #fff;
    padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView``;
