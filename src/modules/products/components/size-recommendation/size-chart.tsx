"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { SizeChartData, MeasurementUnit } from "./types"
import { Button } from "@medusajs/ui"
import { Ruler, Globe } from "lucide-react"

type SizeChartProps = {
  product: HttpTypes.StoreProduct
}

// Mock size chart data
const mockSizeChartData: SizeChartData[] = [
  {
    size: "XS",
    chest: "32-34",
    waist: "26-28",
    hips: "34-36",
    length: "26-27",
    shoulders: "14-15",
    sleeves: "23-24"
  },
  {
    size: "S",
    chest: "34-36",
    waist: "28-30",
    hips: "36-38",
    length: "27-28",
    shoulders: "15-16",
    sleeves: "24-25"
  },
  {
    size: "M",
    chest: "36-38",
    waist: "30-32",
    hips: "38-40",
    length: "28-29",
    shoulders: "16-17",
    sleeves: "25-26"
  },
  {
    size: "L",
    chest: "38-40",
    waist: "32-34",
    hips: "40-42",
    length: "29-30",
    shoulders: "17-18",
    sleeves: "26-27"
  },
  {
    size: "XL",
    chest: "40-42",
    waist: "34-36",
    hips: "42-44",
    length: "30-31",
    shoulders: "18-19",
    sleeves: "27-28"
  },
  {
    size: "XXL",
    chest: "42-44",
    waist: "36-38",
    hips: "44-46",
    length: "31-32",
    shoulders: "19-20",
    sleeves: "28-29"
  }
]

const SizeChart: React.FC<SizeChartProps> = ({ product }) => {
  const [unit, setUnit] = useState<MeasurementUnit>('metric')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric')
  }

  const convertMeasurement = (metricValue: string): string => {
    if (unit === 'metric') return metricValue
    
    // Simple conversion for demo (in real app, use proper conversion)
    const [min, max] = metricValue.split('-').map(v => parseFloat(v))
    if (isNaN(min) || isNaN(max)) return metricValue
    
    const minInch = Math.round(min * 0.393701)
    const maxInch = Math.round(max * 0.393701)
    return `${minInch}-${maxInch}`
  }

  const getUnitLabel = () => unit === 'metric' ? 'cm' : 'inches'

  return (
    <div className="space-y-6">
      {/* Header with unit toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-1">Size Chart</h4>
          <p className="text-sm text-gray-600">
            Find your perfect fit using the measurements below
          </p>
        </div>
        <Button
          onClick={toggleUnit}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          {unit === 'metric' ? 'Metric (cm)' : 'Imperial (inches)'}
        </Button>
      </div>

      {/* Size Chart Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chest
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waist
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hips
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Length
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shoulders
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sleeves
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockSizeChartData.map((sizeData) => (
              <tr
                key={sizeData.size}
                className={`hover:bg-gray-50 cursor-pointer ${
                  selectedSize === sizeData.size ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setSelectedSize(selectedSize === sizeData.size ? null : sizeData.size)}
              >
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{sizeData.size}</span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {convertMeasurement(sizeData.chest)} {getUnitLabel()}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {convertMeasurement(sizeData.waist)} {getUnitLabel()}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {convertMeasurement(sizeData.hips)} {getUnitLabel()}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {convertMeasurement(sizeData.length)} {getUnitLabel()}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {convertMeasurement(sizeData.shoulders)} {getUnitLabel()}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {convertMeasurement(sizeData.sleeves)} {getUnitLabel()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* How to Measure Guide */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Ruler className="w-4 h-4" />
          How to Measure
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h6 className="font-medium text-gray-800 mb-2">Upper Body</h6>
            <ul className="space-y-1">
              <li>• <strong>Chest:</strong> Around the fullest part</li>
              <li>• <strong>Shoulders:</strong> Across the back</li>
              <li>• <strong>Sleeves:</strong> From shoulder to wrist</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-800 mb-2">Lower Body</h6>
            <ul className="space-y-1">
              <li>• <strong>Waist:</strong> At the narrowest point</li>
              <li>• <strong>Hips:</strong> Around the fullest part</li>
              <li>• <strong>Length:</strong> From waist to desired length</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Size Selection Help */}
      {selectedSize && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-800 mb-2">
            Size {selectedSize} Selected
          </h5>
          <p className="text-sm text-blue-700">
            This size should provide a comfortable fit based on the measurements shown above. 
            If you're between sizes, we recommend sizing up for a more relaxed fit.
          </p>
        </div>
      )}
    </div>
  )
}

export default SizeChart

