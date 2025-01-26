import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Skeleton } from '../ui/skeleton'

function SearchCardLoader() {
  return (
    <View style={styles.container}>
        {
            Array.from({ length: 6 }).map((_, index) => (<Skeleton variant="sharp" style={styles.skeleton} key={index} />))
        }
    </View>
  )
}

export default SearchCardLoader

const styles = StyleSheet.create({
  container:{
    flex: 1,
    gap: 8
  },
  skeleton:{
    height: 130,
    borderRadius: 8
  }
});