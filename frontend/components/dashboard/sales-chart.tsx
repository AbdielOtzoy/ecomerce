"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data
const data = [
  { name: "1", value: 1200 },
  { name: "2", value: 900 },
  { name: "3", value: 1600 },
  { name: "4", value: 1700 },
  { name: "5", value: 1400 },
  { name: "6", value: 1800 },
  { name: "7", value: 2000 },
  { name: "8", value: 1700 },
  { name: "9", value: 1500 },
  { name: "10", value: 1900 },
  { name: "11", value: 2100 },
  { name: "12", value: 1800 },
  { name: "13", value: 2300 },
  { name: "14", value: 2500 },
  { name: "15", value: 2200 },
  { name: "16", value: 2400 },
  { name: "17", value: 2600 },
  { name: "18", value: 2200 },
  { name: "19", value: 2100 },
  { name: "20", value: 2500 },
  { name: "21", value: 2700 },
  { name: "22", value: 2300 },
  { name: "23", value: 2900 },
  { name: "24", value: 3100 },
  { name: "25", value: 2800 },
  { name: "26", value: 3200 },
  { name: "27", value: 3300 },
  { name: "28", value: 3400 },
  { name: "29", value: 3200 },
  { name: "30", value: 3500 },
]

export function SalesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => (value % 5 === 0 ? value : "")}
          />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} labelFormatter={(label) => `Day ${label}`} />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
