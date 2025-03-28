import React from "react";
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";
import Footer from "../../components/jobdetails/footer/Footer";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {

    const params = useLocalSearchParams();
    const router = useRouter();
    const [refreshing, setRefresing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const { data, isLoading, error, refetch } = useFetch("job-details", {job_id: params.id});
    const onRefresh = () => {};
    const displayTabContent = () => {

        switch(activeTab)
        {
            case "About":
                return (
                    <JobAbout
                        info={data[0].job_description ?? ["N/A"]}
                    />)    
            case "Qualifications":
                return (
                <Specifics
                    title='Qualifications'
                    points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                />)
            case "Responsibilities":
                return (
                    <Specifics
                        title='Responsibilities'
                        points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                    />)    
            default:
                return (<Text>No Data</Text>)
        }
        
    };

    return ( 
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension='60%'
                    handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' handlePress={() => {}}></ScreenHeaderBtn>
                ),
                headerTitle: "",
            }} 
            />
            
            
            
            <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl=
                {<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl> }>

                {isLoading ? (<ActivityIndicator size='large' color={COLORS.primary}></ActivityIndicator>)
                 : error ? ( <Text>Something went wrong</Text> )
                 : data.length === 0 ? ( <Text>No data available</Text>)
                 : (
                    <View>
                        <Company 
                        companyLogo = {data[0].employer_logo}
                        jobTitle = {data[0].job_title}
                        companyName = {data[0].employer_name}
                        location = {data[0].job_country}
                        />

                        <JobTabs
                        tabs = {tabs}
                        activeTab = {activeTab}
                        setActiveTab = {setActiveTab}
                        />
                        {displayTabContent()}


                        <Footer url={data[0]?.job_google_link ?? 'https/::careers.google.com/jobs/results'}/>
                    </View>

                 )

                
            
            
                }
            


            </ScrollView>
            </>

            
        </SafeAreaView>
    )
}

export default JobDetails;