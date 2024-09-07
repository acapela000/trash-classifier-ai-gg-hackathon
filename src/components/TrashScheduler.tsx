"use client";
import React, { useMemo } from "react";
import React, { useMemo } from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CustomChart } from 'echarts/charts';
import { CalendarComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { range } from "@tensorflow/tfjs";
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
echarts.use(
    [CustomChart, CalendarComponent, SVGRenderer, TooltipComponent]
);
const directWeekLocale: string[] = ['en', 'zh'];
export default function TrashScheduler() {
    const locale = useLocale();
    const c = useTranslations('Calendar');
    const [option, setOption] = React.useState({});
    const date = useMemo(()=>{
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth()+1).toString()}`;
    },[])
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
                        formatter: date,
                        margin: 70, 
                        color:'black'  
                    },
                    orient: 'vertical',
                    monthLabel: {show: false},
                    range: date,
                    dayLabel: {
                        firstDay: locale == 'en'?0:1,
                        nameMap: week
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
    }, [date]);
    return (
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            style={{ width: "100%", height: "90vh" }}
        />
      
    );
}
