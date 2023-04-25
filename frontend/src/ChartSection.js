import './ChartSection.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import Header from './Header';

function ChartSection({ predictedData, originalData, data, bargraphData, thirtyDayData }) {
    let [graphPoints, setGraphPoints] = useState([])
    let [mergedGraphPoints, setMergedGraphPoints] = useState([])
    const [stockCompany, setStockCompany] = useState('apple');
    const handleChange = (e) => {
        setStockCompany(e.target.value);
    };
    useEffect(() => {
        const closure = (predictedData, originalData) => {
            let graphPoints = []
            for (let i = 0; i < predictedData.length; i++) {
                let obj = {}
                obj.name = i + 1;
                obj.predicted = predictedData[i][0][0]
                obj.actual = originalData[i]
                graphPoints.push(obj)
            }
            setGraphPoints(() => graphPoints)
        }
        closure(predictedData, originalData)
    }, [predictedData])

    useEffect(() => {
        const closure = (originalData, thirtyDayData) => {
            let graphPoints = []
            let day = 1
            for (let i = 0; i < originalData.length; i++) {
                let obj = {}
                obj.name = day++;
                obj.tillDate = originalData[i][0][0]
                graphPoints.push(obj)
            }
            for (let i = 0; i < thirtyDayData.length; i++) {
                let obj = {}
                obj.name = day++;
                obj.nextThirtyDays = thirtyDayData[i][0][0]
                graphPoints.push(obj)
            }
            setMergedGraphPoints(() => graphPoints)
        }
        closure(predictedData, originalData)
    }, [originalData, thirtyDayData])


    return (
        <>
            <div className='charts-div'>
                <Header title={'Highest Price for'} />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={graphPoints}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="predicted" stroke="#8884d8" />
                        <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='charts-div charts-div-2'>
                <Header title={'Next 30 days for '} />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={mergedGraphPoints}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="nextThirtyDays" stroke="#8884d8" />
                        <Line type="monotone" dataKey="tillDate" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default ChartSection