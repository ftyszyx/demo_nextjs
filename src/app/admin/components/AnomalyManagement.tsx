"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

// 模拟数据
const anomalies = [
  { id: 1, airport: "机场1", image: "/002.jpg", coordinates: "39.9042° N, 116.4074° E" },
  { id: 2, airport: "机场2", image: "/002.jpg", coordinates: "31.2304° N, 121.4737° E" },
  { id: 3, airport: "机场3", image: "/002.jpg", coordinates: "22.5431° N, 114.0579° E" },
];

export default function AnomalyManagement() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>机场名</TableHead>
          <TableHead>图片缩略图</TableHead>
          <TableHead>拍摄坐标</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {anomalies.map((anomaly) => (
          <TableRow key={anomaly.id}>
            <TableCell>{anomaly.airport}</TableCell>
            <TableCell>
              <Image src={anomaly.image} alt={`Anomaly at ${anomaly.airport}`} width={100} height={100} />
            </TableCell>
            <TableCell>{anomaly.coordinates}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
