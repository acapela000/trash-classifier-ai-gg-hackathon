"use client";
import React from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CustomChart } from 'echarts/charts';
import { CalendarComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

echarts.use(
    [CustomChart, CalendarComponent, SVGRenderer, TooltipComponent]
);

const directWeekLocale: string[] = ['en', 'zh'];
export default function TrashScheduler() {
    const c = useTranslations('Calendar');
    const locale = useLocale();

    const [option, setOption] = React.useState({});

    const currentYear = new Date().getFullYear(); 
    const currentMonth = (new Date().getMonth() + 1).toString();



    const week = React.useMemo(() => {
        if (directWeekLocale.includes(locale)) {
            return c('nameMap');
        }
        return c('nameMap').split(',');
    }, [c, locale]);
    React.useEffect(() => {
        setOption({
            tooltip: {},
            calendar: [
                {
                    left: 'center',
                    top: 'middle',
                    cellSize: [70, 70],
                    // yearLabel: { show: true,fontSize:50},
                    yearLabel: {
                        show: true,
                        position: 'top', // Place at the beginning
                        fontSize: 50,
                        formatter: `${currentYear} - ${currentMonth}`, // Combine year and month on the same line
                        margin: 70,   // Add margin to separate from the days
                        color:'black'
                    },
                    orient: 'vertical',
                    monthLabel: {show: false},
                    range: `${currentYear}-${currentMonth}`,
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
                renderItem: function (params: any, api: any) { return; },
            }
        });
    }, [week, locale,currentMonth,currentYear]);

    return (
        
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            style={{ width: "100%", height: "90vh" }}
            className="relative sm:w-[20%] sm:h-[60vh] mx-auto overflow-auto"
        />

    );
}