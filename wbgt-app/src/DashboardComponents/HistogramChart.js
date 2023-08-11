import { Chart } from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

function HistogramChart({ histogramChartData }) {
    const histogramCanvasRef = useRef(null);
    const histogramChartInstanceRef = useRef(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const histogramCanvas = histogramCanvasRef.current;
        const histogramCtx = histogramCanvas.getContext('2d');

        
        if (histogramChartInstanceRef.current) {
            histogramChartInstanceRef.current.destroy();
        }

        
        if (histogramChartData) {
            histogramChartInstanceRef.current = new Chart(histogramCtx, {
                type: 'bar',
                data: histogramChartData,
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                
                                generateLabels: function (chart) {
                                    const customLabel = {
                                        text: "Current WBGT Values", 
                                        fillStyle: 'rgba(75, 192, 192, 0.2)', 
                                        strokeStyle: 'rgba(75, 192, 192, 1)', 
                                    };
                                    return [customLabel];
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            stacked: true, 
                        },
                        y: {
                            stacked: true, 
                        },
                    },
                },
            });
        }

        
        return () => {
            if (histogramChartInstanceRef.current) {
                histogramChartInstanceRef.current.destroy();
            }
        };
    }, [histogramChartData]);

    return (
        <div className="chart-container">
            <canvas ref={histogramCanvasRef} />
        </div>
    );
}

export default HistogramChart;
