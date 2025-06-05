import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Or from 'react-native-linear-gradient'


const colors = {
  primaryDark: '#7512b2',
  primaryLight: '#bd94d7',
  white: '#ffffff',
  black: '#000000',
};

const PurpleWrapper = ({ children }) => {
    return (
        <LinearGradient
            colors={[colors.primaryDark, colors.primaryLight]}
            style={styles.container}
        >{children}</LinearGradient>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // h-screen w-full
    flexDirection: 'column', // flex-col
    alignItems: 'center', // items-center
    justifyContent: 'center', // justify-center
  },
});

export default PurpleWrapper;