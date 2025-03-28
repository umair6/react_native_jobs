import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants';
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard"
import useFetch from '../../../hook/useFetch'
import { useState } from 'react';

const Nearbyjobs = () => {
  const router = useRouter();
  const [selectedJob, SetSelectedJob] = useState();

  const {data, isLoading, error} = useFetch('search', 
    {query: 'developer jobs in Texas, USA',
    page: '1',
    num_pages: '1',
    country: 'us',
    date_posted: 'all'})

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data?.map((job) => (
              <NearbyJobCard 
              job = {job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate = {(job) => { 
                router.push(`/job-details/${job.job_id}`);
                SetSelectedJob(job.job_id);
              }}
              />
            )
          )
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs