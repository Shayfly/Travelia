import { useState, useRef, useEffect } from 'react';
import useTranslation from '../hooks/useTranslation';
import FlightIcon from './FlightIcon';
import HotelIcon from './HotelIcon';
import CalendarIcon from './CalendarIcon';
import UserIcon from './UserIcon';
import SwapIcon from './SwapIcon';
import SearchIcon from './SearchIcon';
import AirportAutocomplete from './AirportAutocomplete';
import CityAutocomplete from './CityAutocomplete';

export default function HeroSearchBar({ onSearch, type = 'flight', showTripType = true }) {
  const t = useTranslation();
  const [flightForm, setFlightForm] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    adults: 1,
    children: 0,
    infants: 0,
    cabin: 'economy',
    nearby: false,
    direct: false,
  });
  const [showPassengers, setShowPassengers] = useState(false);
  const passengersRef = useRef(null);
  const [hotelForm, setHotelForm] = useState({
    city: '',
    check_in: '',
    check_out: '',
    guests: 1,
    rooms: 1,
  });
  const [tripType, setTripType] = useState('round');

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelForm((prev) => ({ ...prev, [name]: value }));
  };

  const swapLocations = () => {
    setFlightForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const selectTripType = (type) => {
    setTripType(type);
    if (type === 'oneWay') {
      setFlightForm((prev) => ({ ...prev, return: '' }));
    }
  };

  const updateCount = (field, delta, min = 0) => {
    setFlightForm((prev) => ({
      ...prev,
      [field]: Math.max(min, prev[field] + delta),
    }));
  };

  const handleFlightCheckbox = (e) => {
    const { name, checked } = e.target;
    setFlightForm((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (passengersRef.current && !passengersRef.current.contains(e.target)) {
        setShowPassengers(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) {
      const flightData = {
        ...flightForm,
        passengers: flightForm.adults + flightForm.children + flightForm.infants,
      };
      onSearch({
        type,
        data: type === 'flight' ? flightData : hotelForm,
      });
    }
  };

  return (
    <form onSubmit={submit} className="max-w-screen-xl mx-auto mt-4 overflow-hidden">
      <div className="p-4 rounded-2xl bg-white shadow space-y-4">
        {type === 'flight' && showTripType && (
          <div className="flex gap-2 rtl:flex-row-reverse">
            <span className="font-semibold whitespace-nowrap">{t('trip_type')}</span>
            <button
              type="button"
              onClick={() => selectTripType('round')}
              className={`px-3 py-1 rounded-xl border ${tripType === 'round' ? 'bg-primary text-white' : ''}`}
            >
              {t('round_trip')}
            </button>
            <button
              type="button"
              onClick={() => selectTripType('oneWay')}
              className={`px-3 py-1 rounded-xl border ${tripType === 'oneWay' ? 'bg-primary text-white' : ''}`}
            >
              {t('one_way')}
            </button>
          </div>
        )}

        {type === 'flight' ? (
          <>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col flex-1 min-w-[12rem]">
                <label className="text-sm font-medium mb-1">{t('from')}</label>
                <div className="relative">
                  <FlightIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <AirportAutocomplete
                    name="from"
                    value={flightForm.from}
                    onChange={handleFlightChange}
                    placeholder={t('from_placeholder')}
                    className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
                  />
                </div>
              </div>
              <div className="self-center">
                <button
                  type="button"
                  onClick={swapLocations}
                  className="p-2 rounded-full border hover:bg-gray-100 transition-all"
                  aria-label={t('swap')}
                >
                  <SwapIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="flex flex-col flex-1 min-w-[12rem]">
                <label className="text-sm font-medium mb-1">{t('to')}</label>
                <div className="relative">
                  <FlightIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <AirportAutocomplete
                    name="to"
                    value={flightForm.to}
                    onChange={handleFlightChange}
                    placeholder={t('to_placeholder')}
                    className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[10rem]">
                <label className="text-sm font-medium mb-1">{t('depart')}</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="date"
                    name="depart"
                    min={new Date().toISOString().split('T')[0]}
                    value={flightForm.depart}
                    onChange={handleFlightChange}
                    className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[10rem]">
                <label className="text-sm font-medium mb-1">{t('return')}</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="date"
                    name="return"
                    min={flightForm.depart || new Date().toISOString().split('T')[0]}
                    value={flightForm.return}
                    onChange={handleFlightChange}
                    disabled={tripType === 'oneWay'}
                    className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9 disabled:bg-gray-100"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full sm:w-auto" ref={passengersRef}>
                <label className="text-sm font-medium mb-1">{t('passengers_class')}</label>
                <button
                  type="button"
                  onClick={() => setShowPassengers((o) => !o)}
                  className="w-full rounded-xl border px-3 py-2 text-left rtl:text-right"
                >
                  {flightForm.adults + flightForm.children + flightForm.infants} {t('passengers')}, {t(flightForm.cabin === 'premium' ? 'premium_economy' : flightForm.cabin)}
                </button>
                {showPassengers && (
                  <div className="absolute z-10 bg-white border rounded shadow p-3 mt-1 w-56 space-y-2 rtl:right-0">
                    <div className="flex justify-between items-center">
                      <span>{t('adults')}</span>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => updateCount('adults', -1, 1)} className="px-2 border rounded">-</button>
                        <span>{flightForm.adults}</span>
                        <button type="button" onClick={() => updateCount('adults', 1)} className="px-2 border rounded">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('children')}</span>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => updateCount('children', -1)} className="px-2 border rounded">-</button>
                        <span>{flightForm.children}</span>
                        <button type="button" onClick={() => updateCount('children', 1)} className="px-2 border rounded">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('infants')}</span>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => updateCount('infants', -1)} className="px-2 border rounded">-</button>
                        <span>{flightForm.infants}</span>
                        <button type="button" onClick={() => updateCount('infants', 1)} className="px-2 border rounded">+</button>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm mb-1">{t('travel_class')}</label>
                      <select name="cabin" value={flightForm.cabin} onChange={handleFlightChange} className="border rounded px-2 py-1">
                        <option value="economy">{t('economy')}</option>
                        <option value="premium">{t('premium_economy')}</option>
                        <option value="business">{t('business')}</option>
                        <option value="first">{t('first_class')}</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-auto">
                <button
                  className="bg-gradient-to-r from-primary-light to-primary-dark shadow-xl hover:from-primary text-white font-bold rounded-xl px-6 py-2 flex items-center gap-2"
                  type="submit"
                >
                  <SearchIcon className="w-5 h-5" />
                  {t('search')}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="nearby" checked={flightForm.nearby} onChange={handleFlightCheckbox} className="rounded" />
                <span className="text-sm">{t('include_nearby')}</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="direct" checked={flightForm.direct} onChange={handleFlightCheckbox} className="rounded" />
                <span className="text-sm">{t('direct_only')}</span>
              </label>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col flex-1 min-w-[12rem]">
                <label className="text-sm font-medium mb-1">{t('hotel_city')}</label>
                <div className="relative">
                  <CityAutocomplete
                    name="city"
                    value={hotelForm.city}
                    onChange={handleHotelChange}
                    placeholder={`${t('hotel_city')} (Paris)`}
                    className="w-full rounded-xl border px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[10rem]">
                <label className="text-sm font-medium mb-1">{t('check_in')}</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="date"
                    name="check_in"
                    min={new Date().toISOString().split('T')[0]}
                    value={hotelForm.check_in}
                    onChange={handleHotelChange}
                    className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[10rem]">
                <label className="text-sm font-medium mb-1">{t('check_out')}</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="date"
                    name="check_out"
                    min={hotelForm.check_in || new Date().toISOString().split('T')[0]}
                    value={hotelForm.check_out}
                    onChange={handleHotelChange}
                    className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[8rem]">
                <label className="text-sm font-medium mb-1">{t('guests')}</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    value={hotelForm.guests}
                    onChange={handleHotelChange}
                    className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[8rem]">
                <label className="text-sm font-medium mb-1">{t('rooms')}</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    name="rooms"
                    min="1"
                    value={hotelForm.rooms}
                    onChange={handleHotelChange}
                    className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
                  />
                </div>
              </div>
              <div className="ml-auto">
                <button
                  className="bg-gradient-to-r from-primary-light to-primary-dark shadow-xl hover:from-primary text-white font-bold rounded-xl px-6 py-2 flex items-center gap-2"
                  type="submit"
                >
                  <SearchIcon className="w-5 h-5" />
                  {t('search')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
