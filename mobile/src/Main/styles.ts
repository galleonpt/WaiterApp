import {Platform, StatusBar} from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS==='android';

// SafeAreaView is like a view but the content is shown below the status bar(on IOS) but on android we need to get the status bar height
// and set is as margin top
export const Container = styled.SafeAreaView`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px`: '0'}
`;
