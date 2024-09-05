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
    const currentYear = new Date().getFullYear(); 
    const currentMonth = (new Date().getMonth() + 1).toString();
    React.useEffect(() => {
        setOption({
            tooltip: {},
            calendar: [
                {
                    left: 'center',
                    top: 'middle',
                    cellSize: [70, 70],
                    yearLabel: {
                        show: true,
                        position: 'top', 
                        fontSize: 50,
                        formatter: `${currentYear} - ${currentMonth}`, 
                        margin: 70, 
                        color:'black'  
                    },
                    orient: 'vertical',
                    monthLabel: {show: false},
                    range: `${currentYear}-${currentMonth}`,
                    dayLabel: {
                        firstDay: 1
                    },
                }
            ],
            series: {
                type: 'custom',
                coordinateSystem: 'calendar',
                dimensions: [undefined, { type: 'ordinal' }],
                data: [],
                renderItem: function (params: any, api: any) { return; }
            }
        });
    }, [currentMonth,currentYear]);
    return (
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            style={{ width: "100%", height: "90vh" }}
        />
    );
}
