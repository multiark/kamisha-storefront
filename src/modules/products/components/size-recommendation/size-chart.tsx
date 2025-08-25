"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

type SizeChartProps = {
  product: HttpTypes.StoreProduct
}

type SizeChartData = {
  size: string
  chest: string
  waist: string
  hips: string
  length: string
  shoulders: string
  sleeves: string
}

const SizeChart: React.FC<SizeChartProps> = ({ product }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  
  // Mock size chart data - in real implementation, this would come from Zakeke API
  const sizeChartData: SizeChartData[] = [
    { size: 'XS', chest: '86-91', waist: '71-76', hips: '91-96', length: '66', shoulders: '41', sleeves: '58' },
    { size: 'S', chest: '91-96', waist: '76-81', hips: '96-101', length: '68', shoulders: '43', sleeves: '60' },
    { size: 'M', chest: '96-101', waist: '81-86', hips: '101-106', length: '70', shoulders: '45', sleeves: '62' },
    { size: 'L', chest: '101-106', waist: '86-91', hips: '106-111', length: '72', shoulders: '47', sleeves: '64' },
    { size: 'XL', chest: '106-111', waist: '91-96', hips: '111-116', length: '74', shoulders: '49', sleeves: '66' },
    { size: 'XXL', chest: '111-116', waist: '96-101', hips: '116-121', length: '76', shoulders: '51', sleeves: '68' },
  ]

  const imperialSizeChartData: SizeChartData[] = [
    { size: 'XS', chest: '34-36', waist: '28-30', hips: '36-38', length: '26', shoulders: '16', sleeves: '23' },
    { size: 'S', chest: '36-38', waist: '30-32', hips: '38-40', length: '27', shoulders: '17', sleeves: '24' },
    { size: 'M', chest: '38-40', waist: '32-34', hips: '40-42', length: '28', shoulders: '18', sleeves: '25' },
    { size: 'L', chest: '40-42', waist: '34-36', hips: '42-44', length: '29', shoulders: '19', sleeves: '26' },
    { size: 'XL', chest: '42-44', waist: '36-38', hips: '44-46', length: '30', shoulders: '20', sleeves: '27' },
    { size: 'XXL', chest: '44-46', waist: '38-40', hips: '46-48', length: '31', shoulders: '21', sleeves: '28' },
  ]

  const currentData = unit === 'metric' ? sizeChartData : imperialSizeChartData
  const unitLabel = unit === 'metric' ? 'cm' : 'inches'

  return (
    <div className="space-y-6">
      {/* Unit Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Units:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setUnit('metric')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              unit === 'metric'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Metric (cm)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              unit === 'imperial'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Imperial (inches)
          </button>
        </div>
      </div>

      {/* Size Chart Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Chest ({unitLabel})
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Waist ({unitLabel})
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Hips ({unitLabel})
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Length ({unitLabel})
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Shoulders ({unitLabel})
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Sleeves ({unitLabel})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr key={row.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.size}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {row.chest}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {row.waist}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {row.hips}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {row.length}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {row.shoulders}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {row.sleeves}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* How to Measure Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-blue-800 mb-4">
          How to Measure Yourself
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 font-medium text-sm">1</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Chest</h5>
                <p className="text-sm text-blue-700">
                  Measure around the fullest part of your chest, keeping the tape horizontal
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 font-medium text-sm">2</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Waist</h5>
                <p className="text-sm text-blue-700">
                  Measure around your natural waistline, keeping the tape comfortably loose
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 font-medium text-sm">3</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Hips</h5>
                <p className="text-sm text-blue-700">
                  Measure around the fullest part of your hips, keeping the tape horizontal
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 font-medium text-sm">4</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Shoulders</h5>
                <p className="text-sm text-blue-700">
                  Measure across the back from shoulder tip to shoulder tip
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 font-medium text-sm">5</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Length</h5>
                <p className="text-sm text-blue-700">
                  Measure from the base of your neck to your desired length
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 font-medium text-sm">6</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Sleeves</h5>
                <p className="text-sm text-blue-700">
                  Measure from shoulder tip to your desired sleeve length
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> For the most accurate measurements, have someone help you measure, 
            and ensure the measuring tape is snug but not tight. Wear form-fitting clothing when measuring.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SizeChart
