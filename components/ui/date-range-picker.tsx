'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DateRangePickerProps {
  defaultFrom?: string
  defaultTo?: string
  className?: string
}

export function DateRangePicker({ defaultFrom, defaultTo, className }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const from = defaultFrom ? new Date(defaultFrom) : undefined
    const to = defaultTo ? new Date(defaultTo) : undefined
    return from ? { from, to } : undefined
  })

  const fromValue = range?.from ? format(range.from, 'yyyy-MM-dd') : ''
  const toValue = range?.to ? format(range.to, 'yyyy-MM-dd') : ''

  function handleSelect(selected: DateRange | undefined) {
    setRange(selected)
    if (selected?.from && selected?.to) {
      setOpen(false)
    }
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation()
    setRange(undefined)
  }

  const label = range?.from
    ? range.to
      ? `${format(range.from, 'MMM d, yyyy')} – ${format(range.to, 'MMM d, yyyy')}`
      : `${format(range.from, 'MMM d, yyyy')} – Pick end`
    : 'Pick date range'

  return (
    <div className={cn('relative', className)}>
      {/* Hidden inputs so the parent <form> picks up the values on submit */}
      <input type="hidden" name="dateFrom" value={fromValue} />
      <input type="hidden" name="dateTo" value={toValue} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'flex h-11 w-full items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm text-left transition focus:outline-none focus:border-primary',
              !range?.from && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 truncate">{label}</span>
            {range?.from && (
              <X
                className="size-3.5 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={handleClear}
              />
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-auto p-0 rounded-2xl shadow-lg border border-border"
        >
          <div className="p-3 border-b border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={cn('font-medium', range?.from ? 'text-foreground' : '')}>
                {range?.from ? format(range.from, 'MMM d, yyyy') : 'Start date'}
              </span>
              <span>→</span>
              <span className={cn('font-medium', range?.to ? 'text-foreground' : '')}>
                {range?.to ? format(range.to, 'MMM d, yyyy') : 'End date'}
              </span>
            </div>
            {range?.from && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => setRange(undefined)}
              >
                Clear
              </Button>
            )}
          </div>

          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={1}
            initialFocus
          />

          <div className="p-3 border-t border-border flex justify-end">
            <Button
              type="button"
              size="sm"
              className="h-8 text-xs px-4"
              disabled={!range?.from || !range?.to}
              onClick={() => setOpen(false)}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
