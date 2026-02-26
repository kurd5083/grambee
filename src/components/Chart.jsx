import styled from "styled-components";

import { useState, useRef, useMemo } from "react";
import chartBack from "@/assets/chart-back.png";

const pointsMock = [
  120, 450, 780, 320, 610, 900, 430, 670,
  150, 980, 540, 300, 760, 810, 220, 640,
  890, 370, 500, 720, 610, 430, 880, 970
];

const dataXMock = ['1 час', '2 час', '3 час', '4 час', '5 час', '6 час', '7 час', '8 час', '9 час', '10 час', '11 час', '12 час', '13 час', '14 час', '15 час', '16 час', '17 час', '18 час', '19 час', '20 час', '21 час', '22 час', '23 час', '24 час']

const Chart = () => {
    const [hoverChart, setHoverChart] = useState(null)
    const containerRef = useRef(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollStart = useRef(0)

    const paddingX = 20;
    const chartHeight = 150;
    const chartTopPadding = 5;
    const width = 1400;
    const height = 200;

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
            <ChartBG src={chartBack} alt="chartBack"/>
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
                            <stop offset="0%" stop-color="#181A20"/>
                            <stop offset="5%" stop-color="#FFD26D"/>
                            <stop offset="95%" stop-color="#FFB81A"/>
                            <stop offset="100%" stop-color="#21232800"/>
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id="line">
                            <stop offset="0%" stop-color="#181A20"/>
                            <stop offset="5%" stop-color="#FFD26D"/>
                            <stop offset="95%" stop-color="#FFB81A"/>
                            <stop offset="100%" stop-color="#21232800"/>
                        </linearGradient>
                    </defs>
                    <path d={createBezierPath(chartPoints)} fill="none" stroke="url(#line)" strokeWidth={2} />
                    

                    {hoverChart && (() => {
                        const CIRCLE_RADIUS = 6;
                        const circleX = Math.max(CIRCLE_RADIUS, Math.min(hoverChart.x, width - CIRCLE_RADIUS));
                        const circleY = hoverChart.y;

                        return (
                            <>
                                <g transform={`translate(${circleX}, ${circleY})`}>
                                    <line
                                        y1={0}
                                        y2={chartHeight - circleY}
                                        stroke="#FFB81A"
                                        strokeWidth={2}
                                        strokeDasharray="2 2"
                                    />
                                    <line
                                        x1={0}
                                        x2={-width}
                                        strokeWidth={2}
                                        stroke="#FFB81A"
                                        strokeDasharray="2 2"
                                    />
                                </g>
                            </>
                        );
                    })()}
                    {chartPoints.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={6} fill="#FCFDFF" stroke="#FFB81A" strokeWidth={2} />
                    ))}
                    
                    {hoverChart && (() => {
                        const CIRCLE_RADIUS = 6;
                        const circleX = Math.max(CIRCLE_RADIUS, Math.min(hoverChart.x, width - CIRCLE_RADIUS));
                        const circleY = hoverChart.y;

                        const TOOLTIP_HEIGHT = 80;
                        const valueText = `${hoverChart.value}`;
                        const labelText = hoverChart.label;

                        const approxCharWidth = 8;
                        const textWidth = Math.max(valueText.length * approxCharWidth, labelText.length * approxCharWidth);
                        const TOOLTIP_WIDTH = textWidth + 80;

                        const isLeftEdge = circleX - TOOLTIP_WIDTH / 2 < 0;
                        const isRightEdge = circleX + TOOLTIP_WIDTH / 2 > width;
                        const isTopEdge = circleY - TOOLTIP_HEIGHT - 10 < 0;

                        const tooltipX = isLeftEdge ? 0 : isRightEdge ? -TOOLTIP_WIDTH : -TOOLTIP_WIDTH / 2;
                        const tooltipY = isTopEdge ? 10 : -TOOLTIP_HEIGHT - 10;

                        return (
                            <>
                                <g transform={`translate(${circleX}, ${circleY})`}>
                                    <rect
                                        x={tooltipX}
                                        y={tooltipY}
                                        width={TOOLTIP_WIDTH}
                                        height={TOOLTIP_HEIGHT}
                                        rx={16}
                                        fill="#2A2F3E3D"
                                    />
                                    <text x={tooltipX + 12} y={tooltipY + 22} fontSize={14} fill="#D6DCEC" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                                        {hoverChart.label}
                                    </text>
                                    <text x={tooltipX + 12} y={tooltipY + 54} fontSize={24} fill="#D6DCEC" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                                        + {valueText}
                                        <tspan dx={4} fontSize={14} fill="#A3ABBC">₽</tspan>
                                    </text>
                                    <text x={tooltipX + 12} y={tooltipY + 70} fontSize={10} fill="#6A7080CC" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                                        {hoverChart.date}
                                    </text>
                                </g>
                            </>
                        );
                    })()}
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
                </Svg>
            </ScrollContainer>
        </ChartGrid>
    )
}
const ChartGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 200px;
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