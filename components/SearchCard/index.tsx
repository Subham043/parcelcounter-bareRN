import { GlobalSearchType } from '@/utils/types'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    item: GlobalSearchType,
    index: number
}

function SearchCard({item, index}: Props) {
  return (
    <TouchableOpacity style={styles.button} className="shadow" key={index}>
      <View style={styles.imageContainer}>
        <Image
            src={item.image}
            alt="Logo"
            style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.text} numberOfLines={1}>{item.search_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SearchCard

const styles = StyleSheet.create({
  button:{
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  imageContainer:{
    width: 130,
    height: 90,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  image:{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textContainer:{
    flex: 1,
  },
  heading:{
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 700,
  },
  text:{
    fontSize: 14,
    lineHeight: 20,
    color: '#16a34a'
  }
});