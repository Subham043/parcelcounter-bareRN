import { Dimensions, View, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import React from 'react'
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
});

export type PhotoType = {
    id: number;
    uri: any;
}

const photos: PhotoType[] = [
    {
        id: 1,
        uri: require("@/assets/images/banner-0001.webp"),
    },
    {
        id: 2,
        uri: require("@/assets/images/banner-0002.webp"),
    },
    {
        id: 3,
        uri: require("@/assets/images/banner-0003.webp"),
    },
    {
        id: 4,
        uri: require("@/assets/images/banner-0004.webp"),
    },
    {
        id: 5,
        uri: require("@/assets/images/banner-0005.webp"),
    },
    {
        id: 6,
        uri: require("@/assets/images/banner-0006.webp"),
    }
]

const width = Dimensions.get('screen').width;

const CarouselCustom = () => {
    const [index, setIndex] = React.useState(0);
    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={photos}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setIndex(index)}
                renderItem={({ item, index }) => (
                    <Image
                        source={item.uri}
                        className='w-full h-full'
                        resizeMode="cover"
                        key={index}
                    />
                )}
            />
            <View className=' flex-row self-center absolute -bottom-5'>
                {photos.map((_, i) => (
                    <View
                        key={i}
                        className='w-2 h-2 rounded-full mx-1 bg-gray-500'
                        style={[
                            {
                                opacity: i === index ? 1 : 0.5,
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    )
}

export default CarouselCustom

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: width / 2, 
        marginBottom: 20
    }
})