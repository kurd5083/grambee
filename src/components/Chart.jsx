import styled from "styled-components";

import { useState, useRef, useMemo } from "react";
import chartBack from "@/assets/chart-back.png";

const pointsMock = [
    120, 450, 780, 320, 610, 900, 430, 670,
    150, 980, 540, 300, 760, 810, 220, 640,
    890, 370, 500, 720, 610, 430, 880, 970
];

const dataXMock = ['1 час', '2 час', '3 час', '4 час', '5 час', '6 час', '7 час', '8 час', '9 час', '10 час', '11 час', '12 час', '13 час', '14 час', '15 час', '16 час', '17 час', '18 час', '19 час', '20 час', '21 час', '22 час', '23 час', '24 час']

const Chart = ({ type }) => {
    const [hoverChart, setHoverChart] = useState(null)
    const containerRef = useRef(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollStart = useRef(0)

    const paddingX = 20;
    const chartHeight = 200;
    const chartTopPadding = 5;
    const width = 1400;
    const height = 250;

    const points = pointsMock;
    const dataX = dataXMock;
    const xLabels = dataXMock;

    const maxY = Math.max(...points, 1);
    const minY = Math.min(...points, 0);

    const step = (maxY - minY) / 4;

    const dataY = Array.from({ length: 5 }, (_, i) =>
        Math.round(minY + i * step)
    ).reverse()

    const maxYLength = Math.max(...dataY).toString().length;
    const yColumnWidth = maxYLength * 8 + 16;

    const chartPoints = useMemo(() => points.map((item, i) => {
        const x = paddingX + (i * (width - paddingX * 2)) / (dataX.length - 1);

        const y = chartHeight - ((item - minY) / (maxY - minY)) * chartHeight;

        return { x, y };
    }), [points, width, minY, maxY]);

    const createBezierPath = (chartPoints) => {
        let d = `M ${chartPoints[0].x} ${chartPoints[0].y}`;

        for (let i = 1; i < chartPoints.length; i++) {
            const prev = chartPoints[i - 1];
            const curr = chartPoints[i];

            const cp1x = prev.x + (curr.x - prev.x) / 2;
            const cp1y = prev.y;
            const cp2x = prev.x + (curr.x - prev.x) / 2;
            const cp2y = curr.y;

            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
        }

        return d;
    };

    const handleMouseMoveChart = (e) => {
        if (!chartPoints.length) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const scaleX = width / rect.width;
        const scaledMouseX = mouseX * scaleX;

        let closestIndex = 0;
        let minDist = Math.abs(scaledMouseX - chartPoints[0].x);

        chartPoints.forEach((p, i) => {
            const dist = Math.abs(scaledMouseX - p.x);
            if (dist < minDist) {
                minDist = dist;
                closestIndex = i;
            }
        });

        const closest = chartPoints[closestIndex];

        setHoverChart({
            x: closest.x,
            y: closest.y,
            value: points[closestIndex],
            date: dataX[closestIndex],
            label: 'Прибыль',
        });
    };

    const handleMouseLeaveChart = () => setHoverChart(null);

    const handleMouseDown = (e) => {
        if (!containerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX;
        scrollStart.current = containerRef.current.scrollLeft;
    }

    const handleMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return;
        const dx = e.pageX - startX.current;
        containerRef.current.scrollLeft = scrollStart.current - dx;
    }

    const handleMouseUp = () => {
        isDragging.current = false;
    }


    return (
        <ChartGrid
            style={{ gridTemplateColumns: `${yColumnWidth}px 1fr` }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <ChartBG src={chartBack} alt="chartBack" />
            <YAxis>
                {dataY.map((value, index) => {
                    const y = chartTopPadding + ((maxY - value) / (maxY - minY)) * chartHeight;

                    return (
                        <YLabel key={index} style={{ top: y }}>
                            {value}
                        </YLabel>
                    );
                })}
            </YAxis>
            <ScrollContainer ref={containerRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
                <Svg
                    width={width}
                    height={height}
                    viewBox={`0 -${chartTopPadding} ${width} ${height + chartTopPadding}`}
                    preserveAspectRatio="none"
                    onMouseMove={handleMouseMoveChart}
                    onMouseLeave={handleMouseLeaveChart}
                >
                    <defs>
                        <linearGradient id="line">
                            <stop offset="0%" stop-color="#181A20" />
                            <stop offset="5%" stop-color="#FFD26D" />
                            <stop offset="95%" stop-color="#FFB81A" />
                            <stop offset="100%" stop-color="#21232800" />
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id="line">
                            <stop offset="0%" stop-color="#181A20" />
                            <stop offset="5%" stop-color="#FFD26D" />
                            <stop offset="95%" stop-color="#FFB81A" />
                            <stop offset="100%" stop-color="#21232800" />
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient
                            id="lineVerticalGradient"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2={chartHeight}
                        >
                            <stop offset="0%" stopColor="#FFB81A" stopOpacity="1" />
                            <stop offset="100%" stopColor="#191b217b" stopOpacity="0" />
                        </linearGradient>

                        <linearGradient
                            id="lineHorizontalGradient"
                            gradientUnits="userSpaceOnUse"
                            x1={-width}
                            y1="0"
                            x2="0"
                            y2="0"
                        >
                            <stop offset="50%" stopColor="#191B2100" stopOpacity="0" />
                            <stop offset="100%" stopColor="#FFB81A" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path d={createBezierPath(chartPoints)} fill="none" stroke="url(#line)" strokeWidth={2} />

                    {xLabels.map((label, i) => {
                        const x = paddingX + (i * (width - paddingX * 2)) / (xLabels.length - 1);
                        return (
                            <text
                                key={label}
                                x={x}
                                y={chartHeight + 40}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#6A7080CC"
                            >
                                {label}
                            </text>
                        );
                    })}

                    {hoverChart && (() => {
                        const CIRCLE_RADIUS = 6;
                        const circleX = Math.max(
                            CIRCLE_RADIUS,
                            Math.min(hoverChart.x, width - CIRCLE_RADIUS)
                        );
                        const circleY = hoverChart.y;

                        return (
                            <g transform={`translate(${circleX}, ${circleY})`}>
                                {/* Вертикальная линия */}
                                <line
                                    x1={0}
                                    y1={0}
                                    x2={0}
                                    y2={chartHeight - circleY}
                                    stroke="url(#lineVerticalGradient)"
                                    strokeWidth={2}
                                    strokeDasharray="2 2"
                                    pointerEvents="none"
                                />

                                {/* Горизонтальная линия */}
                                <line
                                    x1={0}
                                    y1={0}
                                    x2={-width}
                                    y2={0}
                                    stroke="url(#lineHorizontalGradient)"
                                    strokeWidth={2}
                                    strokeDasharray="2 2"
                                    pointerEvents="none"
                                />
                            </g>
                        );
                    })()}
                    {chartPoints.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={6} fill="#FFB81A" stroke="#FFB81A" strokeWidth={2} />
                    ))}

                    {hoverChart && (() => {
                        const CIRCLE_RADIUS = 6;
                        const circleX = Math.max(CIRCLE_RADIUS, Math.min(hoverChart.x, width - CIRCLE_RADIUS));
                        const circleY = hoverChart.y;

                        const TOOLTIP_HEIGHT = type == "full" ? 150 : 90;
                        const valueText = `${hoverChart.value}`;
                        const labelText = hoverChart.label;

                        const approxCharWidth = 8;
                        const textWidth = Math.max(valueText.length * approxCharWidth, labelText.length * approxCharWidth);
                        const TOOLTIP_WIDTH = type == "full" ? textWidth * 2 + 80 : textWidth + 80;

                        const isLeftEdge = circleX - TOOLTIP_WIDTH / 2 < 0;
                        const isRightEdge = circleX + TOOLTIP_WIDTH / 2 > width;
                        let tooltipY;
                        const chartCenterY = chartHeight / 2;
                        if (type === "full") {
                            tooltipY = chartCenterY - circleY - TOOLTIP_HEIGHT / 2;
                        } else {
                            const isTopEdge = circleY - TOOLTIP_HEIGHT - 10 < 0;
                            tooltipY = isTopEdge ? 10 : -TOOLTIP_HEIGHT - 10;
                        }

                        const tooltipX = isLeftEdge ? 0 : isRightEdge ? -TOOLTIP_WIDTH : -TOOLTIP_WIDTH / 2;


                        return (
                            <>
                                <g transform={`translate(${circleX}, ${circleY})`}>
                                    {type == "full" ? (
                                        <foreignObject
                                            x={tooltipX}
                                            y={tooltipY}
                                            width={TOOLTIP_WIDTH}
                                            height={TOOLTIP_HEIGHT}
                                        >
                                            <div
                                                style={{
                                                    borderRadius: '24px',
                                                    backdropFilter: 'blur(24px)',
                                                    background: '#2A2F3E3D',
                                                    padding: '16px',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                <p style={{ fontSize: 10, color: '#D6DCEC', lineHeight: "10px" }}>
                                                    {hoverChart.date}
                                                </p>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: 12 }} >
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Подписки
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            <mark>+</mark> {valueText}
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Отписки
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            + {valueText}
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Трафик
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            + {valueText}
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Прибыль
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            + {valueText} <span style={{ fontSize: 14, color: '#A3ABBC' }}><mark>₽</mark></span>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </foreignObject >
                                    ) : (
                                        <foreignObject
                                            x={tooltipX}
                                            y={tooltipY}
                                            width={TOOLTIP_WIDTH}
                                            height={TOOLTIP_HEIGHT}
                                        >

                                            <div
                                                style={{
                                                    borderRadius: '24px',
                                                    backdropFilter: 'blur(24px)',
                                                    background: '#2A2F3E3D',
                                                    padding: '16px',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                <h4 style={{ fontSize: 16, color: '#D6DCEC', lineHeight: "16px" }}>
                                                    {hoverChart.label}
                                                </h4>
                                                <h3 style={{ fontSize: 24, color: '#D6DCEC', marginTop: 8, lineHeight: "24px" }}>
                                                    + {valueText} <span style={{ fontSize: 14, color: '#A3ABBC' }}><mark>₽</mark></span>
                                                </h3>
                                                <p style={{ fontSize: 10, color: '#6A7080CC', lineHeight: "10px" }}>
                                                    {hoverChart.date}
                                                </p>
                                            </div>
                                        </foreignObject >
                                    )}

                                </g>
                            </>
                        );
                    })()}

                </Svg>
            </ScrollContainer >
        </ChartGrid >
    )
}
const ChartGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 250px;
  margin-top: 36px;
  padding-left: 24px;
`;
const ChartBG = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 30px;
`;
const YAxis = styled.div`
  position: relative;
  grid-column: 1;
  grid-row: 1;
`;

const YLabel = styled.p`
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  color: #6A7080CC;
  font-size: 10px;
`;

const ScrollContainer = styled.div`
    position: relative;
    grid-column: 2;
    grid-row: 1 / span 2;
    overflow-x: auto;
    cursor: grab;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Svg = styled.svg`
  min-width: 600px;
  display: block;
`;

export default Chart;