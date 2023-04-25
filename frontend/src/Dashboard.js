import { useState, useEffect } from 'react'
import Main from './Main';
import VerticalNav from './VerticalNav';
import HorizontalNav from './HorizontalNav';
import Header from './Header';
import ChartSection from './ChartSection';
import './Dashboard.css'
import data from './data'
import bargraphData from './barData';
import axios from 'axios'

function Dashboard() {
    const [screenSize, setScreenSize] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [predictedData, setPredictedData] = useState([])
    const [originalData, setOriginalData] = useState([])
    const [thirtyDayData, setThirtyDayData] = useState([])

    const updateWindowDimensions = () => {
        setScreenSize(window.innerWidth)
        if (screenSize < '945')
            setIsVisible(false)
        else
            setIsVisible(true)
    }

    useEffect(() => {
        function closure() {
            updateWindowDimensions()
            window.addEventListener('resize', updateWindowDimensions);
            window.addEventListener('load', updateWindowDimensions);
            axios.get('/data')
                .then(res => {
                    let parsedArray1 = []
                    let parsedArray2 = []
                    let parsedArray3 = []
                    let arr1 = res.data.predictedData.split('\n')
                    let arr2 = res.data.originalData.split('\n')
                    let arr3 = res.data.next30daysData.split('\n')
                    for (let i = 1, j = 1; i < arr1.length - 1, j < arr2.length - 1; i++, j++) {
                        parsedArray1.push(JSON.parse("[" + arr1[i] + "]"))
                        if (arr2[j][7] == ' ') {
                            let str = '[' + arr2[j].slice(2, 5) + '.000000]'
                            parsedArray2.push(JSON.parse("[" + str + "]"))
                        }
                        else {
                            parsedArray2.push(JSON.parse("[" + arr2[j] + "]"))
                        }
                    }
                    for (let k = 1; k < arr3.length - 1; k++) {
                        if (arr3[k][7] == ' ') {
                            let str = '[' + arr3[k].slice(2, 5) + '.000000]'
                            parsedArray3.push(JSON.parse("[" + str + "]"))
                        }
                        else {
                            parsedArray3.push(JSON.parse("[" + arr3[k] + "]"))
                        }
                    }
                    parsedArray3.unshift([arr3[0].slice(1)])
                    setPredictedData(parsedArray1)
                    setOriginalData(parsedArray2)
                    setThirtyDayData(parsedArray3)
                })
                .catch(err => console.log(err))
        }
        closure()
        return () => {
            window.removeEventListener('resize', updateWindowDimensions)
            window.removeEventListener('load', updateWindowDimensions)
        }
    }, [screenSize, isVisible])

    return (
        <>
            <div className="Dashboard">
                <VerticalNav isVisible={isVisible} />
                <Main>
                    <HorizontalNav />
                    <ChartSection predictedData={predictedData} originalData={originalData} thirtyDayData={thirtyDayData} data={data} bargraphData={bargraphData} />
                </Main>
            </div>
        </>
    )
}

export default Dashboard