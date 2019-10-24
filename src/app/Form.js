import React from 'react';
import { gte, isEmpty } from 'ramda';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      ni_18_19: '',
      ni_19_20: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchData(taxYear) {
    fetch('/v1/national-insurance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-run-date': taxYear.date,
      },
      body: JSON.stringify({
        income: this.state.value,
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ [taxYear.field]: result.ni });
        },
      );
  }

  taxYearLookup(year) {
    const list = {
      '2018/19': {
        field: 'ni_18_19',
        date: '2018-04-06',
      },
      '2019/20': {
        field: 'ni_19_20',
        date: '2019-04-06',
      },
    };

    return list[year];
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      ni_18_19: '',
      ni_19_20: '',
    });
  }

  handleSubmit(event) {
    if (!isEmpty(this.state.value) && gte(this.state.value, 0)) {
      this.fetchData(this.taxYearLookup('2018/19'));
      this.fetchData(this.taxYearLookup('2019/20'));
    } else {
      alert('Income is not a valid number');
    }

    event.preventDefault();
  }

  render() {
    const niValues = ['2018/19', '2019/20'].map((year) => {
      if (!isEmpty(this.state[this.taxYearLookup(year).field])) {
        return (
          <div key={year}>
              NI for {year} <strong>£{this.state[this.taxYearLookup(year).field]}</strong>
          </div>
        );
      }

      return null;
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
              Income in £
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Check" />
        </form>

        {niValues}
      </div>
    );
  }
}

export default Form;
