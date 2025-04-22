import { useMemo } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import { IconButton } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import useLaunches from '../../hooks/useLaunches'

type Columns = {
  flightNumber: number
  launchDate: Date | string
  mission: string
  rocket: string
  destination?: string
}

export default function UpcomingTable() {
  const { upcomingLaunches, abortLaunch } = useLaunches()

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
        accessorKey: 'destination',
        header: 'Destination',
        size: 150,
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: upcomingLaunches,
    enableRowActions: true,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Abort Launch',
      },
    },
    renderRowActions: ({ row }) => (
      <IconButton
        color="error"
        onClick={() => abortLaunch(row.original.flightNumber)}
      >
        <ClearIcon />
      </IconButton>
    ),
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
