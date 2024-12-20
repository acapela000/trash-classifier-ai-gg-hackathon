'use client'
import React, { useEffect } from "react";
import * as tmImage from '@teachablemachine/image';
import { CircularProgress, Spinner } from '@nextui-org/react';
import { useTranslations } from "next-intl";


type Props = {
    // img: any,
    imgSrc: string,
}
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
export default function ClassifierModels(props: Props) {
    // const img = props.img;
    const [model, setModel] = React.useState<any>();
    const [prediction, setPrediction] = React.useState<any>();

    // Load the model when the component mounts
    useEffect(() => {
        function runPrediction(m: any) {
            setPrediction(undefined)
            const img = new Image();
            img.onload = async () => {
                const pred = await m.predict(img)
                setPrediction(pred);
            }
            img.src = props.imgSrc;
        }

        const loadModel = async () => {
            const loadedModel: any = await tmImage.load('/tm-my-image-model/model.json', '/tm-my-image-model/metadata.json');
            setModel(loadedModel);

            runPrediction(loadedModel);
        };

        if (!model) {
            loadModel();
        } else {
            runPrediction(model);
        }
    }, [props.imgSrc, model]);

    const cm = useTranslations('ClassifierModels');

    return (
        <section className="w-full bg-white p-2 rounded-lg shadow-md mt-4">
            <h3 className="text-xl font-bold">{cm('classifier')}</h3>
            <section className="mt-4 grid grid-cols-3 gap-3 items-center justify-center">
                {prediction ? (
                    prediction.map((key: any, i: any) => (
                        <div key={i} className="text-center">
                            {key.className} <CircularProgress
                                aria-label="Loading..."
                                size="lg"
                                classNames={{
                                    svg: "w-24 h-24",
                                    value: "text-2xl font-semibold",
                                }}
                                value={key.probability * 100}
                                color={
                                    (() => {
                                        switch (key.className) {
                                            case cm('type1'):
                                                return 'warning';
                                            case cm('type2-1'):
                                            case cm('type2-2'):
                                            case cm('type3'):
                                                return 'success';
                                            case cm('type4'):
                                            case cm('type5'):
                                                return 'danger';
                                            // case 'Raw trash':
                                            //     return 'primary';
                                            default:
                                                return 'secondary';
                                        }
                                    })()
                                }
                                showValueLabel={true}
                            />
                        </div>
                    ))
                ) : <Spinner color="success" size="lg" />}
            </section>

        </section>
    );
}
