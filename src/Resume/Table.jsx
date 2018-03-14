import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h5 className="text-muted text-capitalize">{this.props.title}</h5>
        <table className="table table-striped table-hover table-light">
          <thead className="thead-dark">
            <tr>
              {this.props.entries.map(data => (
                <th key={data} className="text-capitalize">
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((data, index) => (
              <tr key={index}>
                {this.props.entries.map(name => {
                  if (name === 'delete') {
                    return (
                      <td key={name}>
                        <button
                          className="btn btn-sm btn-danger p-1 rounded-0 d-inline"
                          onClick={() =>
                            this.props.handleDelete(
                              this.props.title.toLowerCase(),
                              this.props.data[index]['id']
                            )
                          }
                        >
                          Remove {this.props.title}
                        </button>
                      </td>
                    );
                  }
                  return (
                    <td key={name} className="text-capitalize">
                      {Array.isArray(this.props.data[index][name]) ? (
                        <React.Fragment>
                          {this.props.data[index][name].map((value, index) => (
                            <button
                              className="btn btn-sm btn-primary mx-1 text-capitalize rounded-0"
                              key={index}
                            >
                              {value}
                            </button>
                          ))}
                        </React.Fragment>
                      ) : (
                        this.props.data[index][name]
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
