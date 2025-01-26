import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Skeleton } from '../ui/skeleton'

function CategoryCardLoader() {
  return (
    <View style={styles.container}>
        {
            Array.from({ length: 12 }).map((_, index) => (<Skeleton variant="sharp" style={styles.skeleton} key={index} />))
        }
    </View>
  )
}

export default CategoryCardLoader

const styles = StyleSheet.create({  
  container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 4
  },
  skeleton:{
    width: 80,
    height: 130,
    borderRadius: 8
  }
});