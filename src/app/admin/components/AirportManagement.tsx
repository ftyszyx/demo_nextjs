"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// 模拟数据
const airports = [
  { id: 1, name: "机场1", online: true },
  { id: 2, name: "机场2", online: false },
  { id: 3, name: "机场3", online: true },
];

export default function AirportManagement() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>机场名称</TableHead>
          <TableHead>在线状态</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {airports.map((airport) => (
          <TableRow key={airport.id}>
            <TableCell>{airport.name}</TableCell>
            <TableCell>
              <Badge variant={airport.online ? "default" : "destructive"}>{airport.online ? "在线" : "离线"}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
