"use client";
import React from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CustomChart } from 'echarts/charts';
import { CalendarComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { range } from "@tensorflow/tfjs";
import { useLocale } from 'next-intl';

echarts.use(
    [CustomChart, CalendarComponent, SVGRenderer, TooltipComponent]
);
// const config = {
//     tooltip: {},
//     calendar: [
//         {
//             left: 'center',
//             top: 'middle',
//             cellSize: [70, 70],
//             yearLabel: { show: false },
//             orient: 'vertical',
//             dayLabel: {
//                 firstDay: 1,
//                 // nameMap: t('Calendar.dayNames', { returnObjects: true }) 
//             },
//             monthLabel: {
//                 show: false
//             },
//             range: '2024-07'
//         }
//     ],
//     series: {
//         type: 'custom',
//         coordinateSystem: 'calendar',
//         dimensions: [undefined, { type: 'ordinal' }],
//         data: [],
//         renderItem: function (params: any, api: any) { return; }
//     }
// };
// const [option, setOption] = React.useState(config);
// React.useEffect(() => {
//     setOption(config);
//   }, [i18n.language]); 
export default function TrashScheduler() {
    const esTrans = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const jaTrans =['日','月','火','水','木','金','土'];
    const viTrans = ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7']
    const locale = useLocale();
    const getDayNameMap = () => {
        switch (locale) {
          case 'vi':
            return viTrans;
          case 'en':
            return 'EN';
          case 'zh':
            return 'ZH';
          case 'es': 
            return esTrans;
          case 'ja': 
            return jaTrans;
          default: 
            return 'EN'; 
        }
      };
    
    const nameMap = getDayNameMap();
    
    const config = {
        tooltip: {},
        calendar: [
          {
            left: 'center',
            top: 'middle',
            cellSize: [70, 70],
            yearLabel: { show: false },
            orient: 'vertical',
            dayLabel: {
              firstDay: 1,
              nameMap: nameMap
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
          renderItem: function (params:any, api: any) { return; }
        }
      };
    const [option, setOption] = React.useState(config);
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
