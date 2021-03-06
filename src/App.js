import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css';
import './fonts/iconfont.css';
import './App.css';
import './styles/blog.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import BlogItem from './routes/BlogItem';
import blogListData from './data/blog/list';
import blogCategories from './data/blog/categories';
import BlogListItem from './components/BlogListItem';

const categories = Object.keys(blogCategories);
const blogList = blogListData.slice().reverse();

class App extends Component {

  constructor (props) {
    super (props);
    this.state = {
      blogList: blogList,
      navIndex: -1,
      navIndexActive: null
    }
  }

  render() {
    return (
      <Router basename="/">
        <Route
          render={({ history }) => (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Blog</h1>
                <nav>
                  <div className="nav-wrap">
                    <div onClick={() => this.navClick(-1, history)} className={`nav-item ${this.state.navIndex === -1 ? 'active' : ''}`}>全部</div>
                    {
                      categories.map((item, index) => (
                        <div onClick={() => this.navClick(index, history)} key={item} className={`nav-item ${this.state.navIndex === index ? 'active' : ''}`}>{item}</div>
                      ))
                    }
                  </div>
                </nav>
              </header>

              <Switch>
                {/* list */}
                <Route exact path="/" render={({ match }) => (
                  <div className="container">
                  {
                    this.state.blogList.map((item, index) => (
                      <BlogListItem key={`${item.id}`} item={item} index={index} match={match} />
                    ))
                  }
                    <p className="text-small text-light text-center">不管你信不信，这是一条底线</p>
                  </div>
                )} />

                {/* list-item-detail */}
                <Route exact path="/item/:id" component={BlogItem} />
                <Route render={() => <div className="container text-center">Not Found</div>} />
              </Switch>
              
              <footer style={{background: 'black'}}>
                <p style={{textAlign: 'center', margin: 0, padding: 10, color: 'white', fontSize: '12px'}}>豫ICP备17025073号-1</p>
              </footer>
            </div>
          )}
        />

      </Router>
    );
  }

  navClick = (i, history) => {
    if (history.location.pathname.length > 1) {
      history.push('/')
    }
    if (this.state.navIndex !== i) {
      const aimCategory = i > -1 ? categories[i] : -1
      const allList = blogList.slice();
      let list = [];
      if (i > -1) {
        for (let j = 0, len = allList.length; j < len; j++) {
          const item = allList[j]
          item.category === aimCategory && list.push(item)
        }
      } else {
        list = allList
      }
      
      this.setState({
        navIndex: i,
        blogList: list
      })
    }
  }

}

export default App;
