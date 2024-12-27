import { useMemo } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'

type Columns = {
  flightNumber: number
  launchDate: string
  mission: string
  rocket: string
  target: string
}

export default function UpcomingTable() {
  const columns = useMemo<MRT_ColumnDef<Columns>[]>(
    () => [
      {
        accessorKey: 'flightNumber',
        header: 'No.',
        size: 150,
      },
      {
        accessorKey: 'launchDate',
        header: 'Date',
        size: 150,
      },
      {
        accessorKey: 'mission',
        header: 'Mission',
        size: 150,
      },
      {
        accessorKey: 'rocket',
        header: 'Rocket',
        size: 150,
      },
      {
        accessorKey: 'target',
        header: 'Destination',
        size: 150,
      },
    ],
    []
  )
  const data: Columns[] = [
    {
      flightNumber: 1,
      launchDate: '2026-06-13',
      mission: 'suicidal',
      rocket: 'shitty',
      target: 'russia',
    },
  ]

  const table = useMaterialReactTable({
    columns,
    data,
    mrtTheme: () => ({
      baseBackgroundColor: 'rgba(0, 0, 0, 0)',
    }),
    muiTableHeadCellProps: {
      sx: () => ({
        color: 'var(--bright);',
      }),
    },
    muiTableBodyCellProps: {
      sx: {
        color: 'var(--bright);',
      },
    },
    muiBottomToolbarProps: {
      sx: {
        color: 'var(--bright);',
      },
    },
  })
  return <MaterialReactTable table={table} />
}
