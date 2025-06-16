"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"

interface CellData {
  [key: string]: string
}

export default function CustomTable() {
  const [cellData, setCellData] = useState<CellData>({})
  const [selectedCell, setSelectedCell] = useState<string | null>(null)
  const [editingCell, setEditingCell] = useState<string | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const ROWS = 1000
  const COLS = 15
  const ROW_HEIGHT = 32
  const VISIBLE_ROWS = Math.ceil(window?.innerHeight / ROW_HEIGHT) || 30
  const BUFFER_ROWS = 5

  // Calculate visible row range
  const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_ROWS)
  const endRow = Math.min(ROWS, startRow + VISIBLE_ROWS + BUFFER_ROWS * 2)

  // Generate column letters (A, B, C, ..., O)
  const getColumnLetter = (index: number): string => {
    return String.fromCharCode(65 + index)
  }

  // Generate cell ID (e.g., "A1", "B2")
  const getCellId = (row: number, col: number): string => {
    return `${getColumnLetter(col)}${row + 1}`
  }

  // Validate and format number input
  const validateNumber = (value: string): string => {
    if (value === "" || value === "-") return value

    // Remove any non-numeric characters except decimal point and minus
    const cleaned = value.replace(/[^0-9.-]/g, "")

    // Handle multiple decimal points
    const parts = cleaned.split(".")
    if (parts.length > 2) {
      return parts[0] + "." + parts.slice(1).join("")
    }

    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      return parts[0] + "." + parts[1].substring(0, 2)
    }

    return cleaned
  }

  // Get cell background color based on value
  const getCellColor = (value: string): string => {
    if (!value) return "bg-white"

    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return "bg-white"

    if (numValue === 40) return "bg-green-100"
    if (numValue > 40) return "bg-red-100"
    return "bg-white"
  }

  // Handle cell click - immediately start editing
  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId)
    setEditingCell(cellId)
  }

  // Handle cell value change with validation
  const handleCellChange = (cellId: string, value: string) => {
    const validatedValue = validateNumber(value)
    setCellData((prev) => ({
      ...prev,
      [cellId]: validatedValue,
    }))
  }

  // Handle key press in cell
  const handleKeyPress = (e: React.KeyboardEvent, cellId: string) => {
    if (e.key === "Enter") {
      setEditingCell(null)
      // Move to next row
      const [col, row] = [cellId.charAt(0), Number.parseInt(cellId.slice(1))]
      if (row < ROWS) {
        const nextCellId = `${col}${row + 1}`
        setSelectedCell(nextCellId)
        setEditingCell(nextCellId)
      }
    } else if (e.key === "Escape") {
      setEditingCell(null)
    } else if (e.key === "Tab") {
      e.preventDefault()
      setEditingCell(null)
      // Move to next column
      const [col, row] = [cellId.charAt(0), Number.parseInt(cellId.slice(1))]
      const colIndex = col.charCodeAt(0) - 65
      if (colIndex < COLS - 1) {
        const nextCellId = `${getColumnLetter(colIndex + 1)}${row}`
        setSelectedCell(nextCellId)
        setEditingCell(nextCellId)
      }
    }
  }

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  // Focus input when editing starts
  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingCell])

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Excel-like toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2">
        <div className="text-sm font-medium">Excel Clone - 1000 Rows</div>
        <div className="ml-auto text-sm text-gray-600">
          {selectedCell && `Selected: ${selectedCell}`}
          <span className="ml-4 text-xs">Numbers only • 2 decimals • Red {">"}40 • Green =40</span>
        </div>
      </div>

      {/* Formula bar */}
      <div className="bg-white border-b border-gray-300 p-2 flex items-center gap-2">
        <div className="w-16 text-sm font-medium text-gray-600">{selectedCell || "A1"}</div>
        <div className="flex-1">
          <Input
            value={selectedCell ? cellData[selectedCell] || "" : ""}
            onChange={(e) => selectedCell && handleCellChange(selectedCell, e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter number (up to 2 decimals)..."
          />
        </div>
      </div>

      {/* Spreadsheet container */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Row numbers - sticky left */}
          <div className="w-12 bg-gray-200 border-r border-gray-300 flex-shrink-0">
            {/* Header */}
            <div className="h-8 border-b border-gray-300 flex items-center justify-center text-xs font-medium bg-gray-200"></div>
            {/* Scrollable row numbers */}
            <div className="overflow-hidden" style={{ height: "calc(100% - 32px)" }}>
              <div
                style={{
                  transform: `translateY(-${scrollTop}px)`,
                  height: ROWS * ROW_HEIGHT,
                }}
              >
                {Array.from({ length: ROWS }, (_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="h-8 border-b border-gray-300 flex items-center justify-center text-xs font-medium bg-gray-200"
                  >
                    {rowIndex + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main grid area */}
          <div className="flex-1 flex flex-col">
            {/* Column headers - sticky top */}
            <div className="flex bg-gray-200 border-b border-gray-300 h-8 flex-shrink-0">
              {Array.from({ length: COLS }, (_, colIndex) => (
                <div
                  key={colIndex}
                  className="w-20 h-8 border-r border-gray-300 flex items-center justify-center text-xs font-medium"
                >
                  {getColumnLetter(colIndex)}
                </div>
              ))}
            </div>

            {/* Scrollable cells area */}
            <div
              ref={containerRef}
              className="flex-1 overflow-auto"
              onScroll={handleScroll}
              style={{ height: "calc(100% - 32px)" }}
            >
              <div style={{ height: ROWS * ROW_HEIGHT, position: "relative" }}>
                {/* Render only visible rows */}
                <div
                  style={{
                    position: "absolute",
                    top: startRow * ROW_HEIGHT,
                    left: 0,
                    right: 0,
                  }}
                >
                  {Array.from({ length: endRow - startRow }, (_, index) => {
                    const rowIndex = startRow + index
                    return (
                      <div key={rowIndex} className="flex" style={{ height: ROW_HEIGHT }}>
                        {Array.from({ length: COLS }, (_, colIndex) => {
                          const cellId = getCellId(rowIndex, colIndex)
                          const isSelected = selectedCell === cellId
                          const isEditing = editingCell === cellId
                          const cellValue = cellData[cellId] || ""
                          const cellColor = getCellColor(cellValue)

                          return (
                            <div
                              key={cellId}
                              className={`w-20 h-8 border-r border-b border-gray-300 relative cursor-pointer ${
                                isSelected ? "ring-2 ring-blue-500 z-10" : ""
                              } ${cellColor} hover:bg-gray-50`}
                              onClick={() => handleCellClick(cellId)}
                            >
                              {isEditing ? (
                                <Input
                                  ref={inputRef}
                                  value={cellValue}
                                  onChange={(e) => handleCellChange(cellId, e.target.value)}
                                  onKeyDown={(e) => handleKeyPress(e, cellId)}
                                  onBlur={() => setEditingCell(null)}
                                  className="w-full h-full border-0 rounded-none p-1 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                                />
                              ) : (
                                <div className="w-full h-full p-1 text-xs flex items-center overflow-hidden">
                                  {cellValue}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-gray-100 border-t border-gray-300 p-1 text-xs text-gray-600 flex items-center justify-between">
        <div>Ready - Virtualized View</div>
        <div className="flex gap-4">
          <span>Cells: {Object.keys(cellData).length}</span>
          <span>Rows: {ROWS}</span>
          <span>
            Visible: {startRow + 1}-{endRow}
          </span>
        </div>
      </div>
    </div>
  )
}
