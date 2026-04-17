const DistrictFilter = ({ value, options, onChange }) => {
  return (
    <div className="filter-toolbar" role="region" aria-label="District filter">
      <label className="filter-label" htmlFor="district-filter">
        District
      </label>
      <select
        id="district-filter"
        className="filter-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictFilter;