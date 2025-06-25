// Example usage: import HeroSearchBar from './HeroSearchBar';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useTranslation from '../hooks/useTranslation';
import FlightIcon from './FlightIcon';
import HotelIcon from './HotelIcon';
import CarIcon from './CarIcon';

export default function HeroSearchBar({ onSearch }) {
  const t = useTranslation();
  const [tab, setTab] = useState('flights');

  const [flightData, setFlightData] = useState({
    origin: 'Tel Aviv - TLV',
    destination: 'London - LHR',
    range: [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
      },
    ],
    passengers: 1,
  });

  const [hotelData, setHotelData] = useState({
    city: 'Jerusalem',
    range: [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 5),
        key: 'selection',
      },
    ],
    guests: 2,
    rooms: 1,
  });

  const [carData, setCarData] = useState({
    pickup: 'Tel Aviv',
    dropoff: 'Haifa',
    range: [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 3),
        key: 'selection',
      },
    ],
    driverAge: 25,
  });

  const handleRange = (ranges, setter) => {
    setter((data) => ({ ...data, range: [ranges.selection] }));
  };

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter((data) => ({ ...data, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) {
      const data = tab === 'flights' ? flightData : tab === 'hotels' ? hotelData : carData;
      onSearch({ type: tab, data });
    }
  };

  const isFlights = tab === 'flights';
  const isHotels = tab === 'hotels';

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 space-y-4 w-full max-w-3xl mx-auto">
      <div className="flex justify-around border-b pb-2">
        <button
          type="button"
          onClick={() => setTab('flights')}
          className={`flex items-center gap-1 px-3 py-1 border-b-2 ${isFlights ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
        >
          <FlightIcon className="w-5 h-5" />
          {t('flights')}
        </button>
        <button
          type="button"
          onClick={() => setTab('hotels')}
          className={`flex items-center gap-1 px-3 py-1 border-b-2 ${isHotels ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
        >
          <HotelIcon className="w-5 h-5" />
          {t('hotels')}
        </button>
        <button
          type="button"
          onClick={() => setTab('cars')}
          className={`flex items-center gap-1 px-3 py-1 border-b-2 ${tab === 'cars' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
        >
          <CarIcon className="w-5 h-5" />
          {t('cars')}
        </button>
      </div>
      <form onSubmit={submit} className="space-y-4">
        {isFlights && (
          <div className="grid md:grid-cols-5 gap-2">
            <div className="relative">
              <FlightIcon className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
              <input
                list="airports"
                name="origin"
                value={flightData.origin}
                onChange={(e) => handleChange(e, setFlightData)}
                className="w-full border pl-8 p-2 rounded"
                placeholder={t('from')}
              />
              <datalist id="airports">
                <option value="Tel Aviv - TLV" />
                <option value="New York - JFK" />
                <option value="London - LHR" />
              </datalist>
            </div>
            <div className="relative">
              <FlightIcon className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
              <input
                list="airports"
                name="destination"
                value={flightData.destination}
                onChange={(e) => handleChange(e, setFlightData)}
                className="w-full border pl-8 p-2 rounded"
                placeholder={t('to')}
              />
            </div>
            <div className="md:col-span-2">
              <DateRangePicker
                ranges={flightData.range}
                onChange={(ranges) => handleRange(ranges, setFlightData)}
                moveRangeOnFirstSelection={false}
                rangeColors={["#2563eb"]}
              />
            </div>
            <input
              type="number"
              name="passengers"
              min="1"
              value={flightData.passengers}
              onChange={(e) => handleChange(e, setFlightData)}
              className="border p-2 rounded"
              placeholder={t('passengers')}
            />
          </div>
        )}
        {isHotels && (
          <div className="grid md:grid-cols-5 gap-2">
            <div className="relative md:col-span-2">
              <HotelIcon className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
              <input
                list="cities"
                name="city"
                value={hotelData.city}
                onChange={(e) => handleChange(e, setHotelData)}
                className="w-full border pl-8 p-2 rounded"
                placeholder={t('hotel_city')}
              />
              <datalist id="cities">
                <option value="Jerusalem" />
                <option value="Tel Aviv" />
                <option value="London" />
              </datalist>
            </div>
            <div className="md:col-span-2">
              <DateRangePicker
                ranges={hotelData.range}
                onChange={(ranges) => handleRange(ranges, setHotelData)}
                moveRangeOnFirstSelection={false}
                rangeColors={["#2563eb"]}
              />
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                name="guests"
                min="1"
                value={hotelData.guests}
                onChange={(e) => handleChange(e, setHotelData)}
                className="border p-2 rounded w-full"
                placeholder={t('guests')}
              />
              <input
                type="number"
                name="rooms"
                min="1"
                value={hotelData.rooms}
                onChange={(e) => handleChange(e, setHotelData)}
                className="border p-2 rounded w-full"
                placeholder={t('rooms')}
              />
            </div>
          </div>
        )}
        {tab === 'cars' && (
          <div className="grid md:grid-cols-5 gap-2">
            <div className="relative">
              <CarIcon className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
              <input
                list="cities"
                name="pickup"
                value={carData.pickup}
                onChange={(e) => handleChange(e, setCarData)}
                className="w-full border pl-8 p-2 rounded"
                placeholder={t('pickup')}
              />
            </div>
            <div className="relative">
              <CarIcon className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
              <input
                list="cities"
                name="dropoff"
                value={carData.dropoff}
                onChange={(e) => handleChange(e, setCarData)}
                className="w-full border pl-8 p-2 rounded"
                placeholder={t('dropoff')}
              />
            </div>
            <div className="md:col-span-2">
              <DateRangePicker
                ranges={carData.range}
                onChange={(ranges) => handleRange(ranges, setCarData)}
                moveRangeOnFirstSelection={false}
                rangeColors={["#2563eb"]}
              />
            </div>
            <input
              type="number"
              name="driverAge"
              min="18"
              value={carData.driverAge}
              onChange={(e) => handleChange(e, setCarData)}
              className="border p-2 rounded"
              placeholder={t('driver_age')}
            />
          </div>
        )}
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
            {t('search')}
          </button>
        </div>
      </form>
    </div>
  );
}
