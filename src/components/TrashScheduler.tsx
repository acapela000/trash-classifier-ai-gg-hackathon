"use client";
import React from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CustomChart } from 'echarts/charts';
import { CalendarComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { range } from "@tensorflow/tfjs";

echarts.use(
    [CustomChart, CalendarComponent, SVGRenderer, TooltipComponent]
);

export default function TrashScheduler() {
    const [option, setOption] = React.useState({});
    const [cellSize, setCellSize] = React.useState([70, 70]);
    // const calculateCellSize = () => {
    //     const width = window.innerWidth; 
    //     if (width <= 640) {
    //       return [40, 40]; 
    //     } else {
    //       return [70, 70]; 
    //     }
    //   };
      React.useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setCellSize(width <=640 ? [40,40] : [70,70]);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
      React.useEffect(()=>{
        setOption({
            tooltip: {},
            calendar: [
                {
                    left: 'center',
                    top: 'middle',
                    cellSize: cellSize,
                    yearLabel: { show: false },
                    orient: 'vertical',
                    dayLabel: {
                        firstDay: 1,
                    },
                    monthLabel: {
                        show: false
                    },
                    range: '2024-07'
                }
            ],  
            series: {
                type: 'custom',
                coordinateSystem: 'calendar',
                dimensions: [undefined, { type: 'ordinal' }],
                data: [],
                renderItem: function (params: any, api: any) { return; }
            }
        })
      },[cellSize])
    //get current year/month
    // const now = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
    // range = now;

    return (
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            style={{ width: "100%", height: "90vh" }}
        />
    );
}
