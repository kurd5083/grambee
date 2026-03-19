import styled from "styled-components";

import { useState, useRef, useMemo } from "react";
import chartBack from "@/assets/chart-back.png";

const defaultPoints = Array(24).fill(0);

const defaultXAxisLabels = ['1 час', '2 час', '3 час', '4 час', '5 час', '6 час', '7 час', '8 час', '9 час', '10 час', '11 час', '12 час', '13 час', '14 час', '15 час', '16 час', '17 час', '18 час', '19 час', '20 час', '21 час', '22 час', '23 час', '24 час']

const Chart = ({ params, points, xAxisLabels }) => {
    const [hoverChart, setHoverChart] = useState(null)

    const containerRef = useRef(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollStart = useRef(0)

    const paddingX = 20;
    const chartHeight = 200;
    const chartTopPadding = 10;
    
    const width = 1400;
    const height = 250;

    const safePoints = points ?? defaultPoints;

    const safeXAxisLabels = xAxisLabels ?? defaultXAxisLabels;

    const dataX = safeXAxisLabels;
    const xLabels = safeXAxisLabels;

    const maxY = Math.max(...safePoints, 1);
    const minY = Math.min(...safePoints, 0);

    const step = (maxY - minY) / 4;

    const dataY = Array.from({ length: 5 }, (_, i) =>
        Math.round(minY + i * step)
    ).reverse()

    const maxYLength = Math.max(...dataY).toString().length;
    const yColumnWidth = maxYLength * 8 + 16;

    const chartPoints = useMemo(() => safePoints.map((item, i) => {
        const x = paddingX + (i * (width - paddingX * 2)) / (dataX.length - 1);

        const y = chartHeight - ((item - minY) / (maxY - minY)) * chartHeight;

        return { x, y };
    }), [safePoints, width, minY, maxY]);

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
            value: safePoints[closestIndex],

            joins: params[closestIndex].joins,
            leaves: params[closestIndex].leaves,
            remained: params[closestIndex].remained,
            totalActive: params[closestIndex].totalActive,

            additions: params[closestIndex].additions,
            subtractions: params[closestIndex].subtractions,
            date: params[closestIndex].date,
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
                            <stop offset="0%" stop-color="#FFB81A" stopOpacity="1" />
                            <stop offset="100%" stop-color="#191b217b" stopOpacity="0" />
                        </linearGradient>

                        <linearGradient
                            id="lineHorizontalGradient"
                            gradientUnits="userSpaceOnUse"
                            x1={-width}
                            y1="0"
                            x2="0"
                            y2="0"
                        >
                            <stop offset="50%" stop-color="#191B2100" stopOpacity="0" />
                            <stop offset="100%" stop-color="#FFB81A" stopOpacity="1" />
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
                                style={{ userSelect: 'none' }}
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

                        const TOOLTIP_HEIGHT = 200;
                        const TOOLTIP_WIDTH = 280;

                        const isLeftEdge = circleX - TOOLTIP_WIDTH / 2 < 0;
                        const isRightEdge = circleX + TOOLTIP_WIDTH / 2 > width;

                        const chartCenterY = chartHeight / 2;
                        let tooltipY = chartCenterY - circleY - TOOLTIP_HEIGHT / 2;

                        const tooltipX = isLeftEdge ? 0 : isRightEdge ? -TOOLTIP_WIDTH : -TOOLTIP_WIDTH / 2;

                        return (
                            <>
                                <g transform={`translate(${circleX}, ${circleY})`}>
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
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: 12 }}>
                                                {hoverChart.joins !== undefined && (
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Присоединились
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            <mark>+</mark> {hoverChart.joins} <span style={{ fontSize: 14, color: '#A3ABBC' }}>чел.</span>
                                                        </h3>
                                                    </div>
                                                )}
                                                
                                                {hoverChart.leaves !== undefined && (
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Покинули
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            <mark>-</mark> {hoverChart.leaves} <span style={{ fontSize: 14, color: '#A3ABBC' }}>чел.</span>
                                                        </h3>
                                                    </div>
                                                )}
                                                
                                                {hoverChart.remained !== undefined && (
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Осталось
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            {hoverChart.remained} <span style={{ fontSize: 14, color: '#A3ABBC' }}>чел.</span>
                                                        </h3>
                                                    </div>
                                                )}
                                                {hoverChart.totalActive !== undefined && (
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Всего активных
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            {hoverChart.totalActive} <span style={{ fontSize: 14, color: '#A3ABBC' }}>чел.</span>
                                                        </h3>
                                                    </div>
                                                )}
                                                {hoverChart.additions !== undefined && (
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Пополнения
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            <mark>+</mark> {hoverChart.additions.toFixed(2)} <mark>₽</mark>
                                                        </h3>
                                                    </div>
                                                )}
                                                {hoverChart.subtractions !== undefined && (
                                                    <div>
                                                        <h4 style={{ fontSize: 14, color: '#6A7080', lineHeight: "14px" }}>
                                                            Списания
                                                        </h4>
                                                        <h3 style={{ fontSize: 20, color: '#D6DCEC', marginTop: 8, lineHeight: "20px" }}>
                                                            - {hoverChart.subtractions.toFixed(2)} <mark>₽</mark>
                                                        </h3>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </foreignObject >
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
  user-select: none;
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