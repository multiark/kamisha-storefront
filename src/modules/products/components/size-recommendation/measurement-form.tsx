"use client"

import { Input } from "@medusajs/ui"
import { useState } from "react"

type BodyMeasurements = {
  height: string
  weight: string
  chest: string
  waist: string
  hips: string
  inseam: string
  shoulders: string
  age: string
  gender: string
}

type MeasurementFormProps = {
  measurements: BodyMeasurements
  onMeasurementChange: (field: keyof BodyMeasurements, value: string) => void
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  measurements,
  onMeasurementChange,
}) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')

  const handleInputChange = (field: keyof BodyMeasurements, value: string) => {
    // Basic validation for numeric fields
    if (['height', 'weight', 'chest', 'waist', 'hips', 'inseam', 'shoulders', 'age'].includes(field)) {
      const numValue = parseFloat(value)
      if (isNaN(numValue) && value !== '') return
    }
    
    onMeasurementChange(field, value)
  }

  const convertUnit = (value: string, fromUnit: 'metric' | 'imperial', toUnit: 'metric' | 'imperial') => {
    if (!value || fromUnit === toUnit) return value
    
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return value
    
    if (fromUnit === 'metric' && toUnit === 'imperial') {
      // Convert cm to inches, kg to lbs
      if (['height', 'chest', 'waist', 'hips', 'inseam', 'shoulders'].includes(field)) {
        return (numValue / 2.54).toFixed(1)
      } else if (field === 'weight') {
        return (numValue * 2.20462).toFixed(1)
      }
    } else if (fromUnit === 'imperial' && toUnit === 'metric') {
      // Convert inches to cm, lbs to kg
      if (['height', 'chest', 'waist', 'hips', 'inseam', 'shoulders'].includes(field)) {
        return (numValue * 2.54).toFixed(1)
      } else if (field === 'weight') {
        return (numValue / 2.20462).toFixed(1)
      }
    }
    
    return value
  }

  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    if (newUnit === unit) return
    
    setUnit(newUnit)
    
    // Convert all measurements to new unit
    const newMeasurements = { ...measurements }
    Object.keys(newMeasurements).forEach((key) => {
      const field = key as keyof BodyMeasurements
      if (['height', 'weight', 'chest', 'waist', 'hips', 'inseam', 'shoulders'].includes(field)) {
        newMeasurements[field] = convertUnit(newMeasurements[field], unit, newUnit)
      }
    })
    
    // Update all measurements at once
    Object.keys(newMeasurements).forEach((key) => {
      const field = key as keyof BodyMeasurements
      onMeasurementChange(field, newMeasurements[field])
    })
  }

  return (
    <div className="space-y-6">
      {/* Unit Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Units:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleUnitChange('metric')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              unit === 'metric'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Metric
          </button>
          <button
            onClick={() => handleUnitChange('imperial')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              unit === 'imperial'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Imperial
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <Input
            type="number"
            value={measurements.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="25"
            min="13"
            max="100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={measurements.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Height and Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <Input
            type="number"
            value={measurements.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder={unit === 'metric' ? '175' : '69'}
            step="0.1"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <Input
            type="number"
            value={measurements.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder={unit === 'metric' ? '70' : '154'}
            step="0.1"
            min="0"
          />
        </div>
      </div>

      {/* Body Measurements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chest ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <Input
            type="number"
            value={measurements.chest}
            onChange={(e) => handleInputChange('chest', e.target.value)}
            placeholder={unit === 'metric' ? '95' : '37'}
            step="0.1"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Waist ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <Input
            type="number"
            value={measurements.waist}
            onChange={(e) => handleInputChange('waist', e.target.value)}
            placeholder={unit === 'metric' ? '80' : '31'}
            step="0.1"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hips ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <Input
            type="number"
            value={measurements.hips}
            onChange={(e) => handleInputChange('hips', e.target.value)}
            placeholder={unit === 'metric' ? '95' : '37'}
            step="0.1"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shoulders ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <Input
            type="number"
            value={measurements.shoulders}
            onChange={(e) => handleInputChange('shoulders', e.target.value)}
            placeholder={unit === 'metric' ? '45' : '18'}
            step="0.1"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inseam ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <Input
            type="number"
            value={measurements.inseam}
            onChange={(e) => handleInputChange('inseam', e.target.value)}
            placeholder={unit === 'metric' ? '80' : '31'}
            step="0.1"
            min="0"
          />
        </div>
        
        <div className="flex items-end">
          <div className="text-sm text-gray-500">
            <p>💡 Tip: Use a measuring tape for accurate measurements</p>
            <p>📱 Or use our virtual measurement tool for easier results</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeasurementForm
