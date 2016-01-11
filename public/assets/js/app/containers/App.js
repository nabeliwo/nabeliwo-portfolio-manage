import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMenuVisible } from '../actions/';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';


class App extends Component {
  constructor(props) {
    super(props);
    this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
    this.handleHistory = this.handleHistory.bind(this);
  }

  handleHistory(e) {
    e.preventDefault();

    const path = e.target.getAttribute('href');

    this.props.history.push(path);
  }

  onMenuBtnClick() {
    this.props.toggleMenuVisible(this.props.menuVisible);
  }

  // :TODO react-routerのIndexrouteに変更
  renderChildren() {
    const { children } = this.props;

    if (children) {
      return children;
    }

    return <Dashboard />;
  }

  render() {
    return (
      <div>
        <Header handleHistory={this.handleHistory}
                onMenuBtnClick={this.onMenuBtnClick}
                menuVisible={this.props.menuVisible}
                pages={this.props.pages} />

        <Sidebar handleHistory={this.handleHistory}
                 pages={this.props.pages} />

        <div id="board">
          <div className="board__inner">
            {this.renderChildren()}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  pages: PropTypes.array.isRequired,
  menuVisible: PropTypes.bool.isRequired,
  toggleMenuVisible: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    pages: state.pages,
    menuVisible: state.menuVisible
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleMenuVisible
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
