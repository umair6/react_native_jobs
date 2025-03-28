import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, Colors, SIZES } from '../../../constants';
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter();

  const {data, isLoading, error} = useFetch('search', 
    {query: 'developer jobs in Texas, USA',
    page: '1',
    num_pages: '1',
    country: 'us',
    date_posted: 'all'})

  const [selectedJob, SetSelectedJob] = useState();
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    SetSelectedJob(item.job_id);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ) : error ? ( 
          <Text>Something went wrong</Text>)
        : (
          <FlatList 
            data={data}
            renderItem= {({item}) => (
              <PopularJobCard 
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle = {{columnGap: SIZES.small}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs