import { useMemo } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import useLaunches from '../../hooks/useLaunches'

type Columns = {
  flightNumber: number
  launchDate: string | Date
  mission: string
  rocket: string
  customers: string[]
}

export default function HistoryTable() {
  const { historyLaunches } = useLaunches()

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
        accessorKey: 'customers',
        header: 'Customers',
        size: 150,
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: historyLaunches,
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
