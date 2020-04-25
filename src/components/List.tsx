import React, {Component, SyntheticEvent} from 'react';
import Item from './Item';
import {Cat, CatFullInfo, createCatFromDto} from '../models/cat.model';
import * as _ from 'lodash';
import {getCatList} from '../utils/cat-management-utils';

interface ListState {
  catList: Cat[],
  searchTerm: string,
}

interface listProps {
  updateInfo: (catInfo: CatFullInfo) => void,
}

export default class List extends Component<listProps, ListState> {

  readonly LIST_STORAGE_KEY = 'list';

  constructor(props: any) {
    super(props);
    this.state = {catList: [], searchTerm: ''};
    this.toggleDisable = this.toggleDisable.bind(this);
    this.findCats = this.findCats.bind(this);
  }

  componentDidMount() {
    const listFromStorage = this.listFromStorage;

    if (listFromStorage.length > 0) {
      this.setState({catList: listFromStorage});
    } else {
      this.loadCatList();
    }
  }

  private loadCatList(): void {
    getCatList()
      .then(json => json.map(createCatFromDto))
      .then(catList => this.setState({catList}))
      .then(() => this.saveListToStorage(this.state.catList))
      .catch(error => alert('Error HTTP: ' + error.message));
  }

  private get catList(): Cat[] {
    return this.state.searchTerm
      ? this.sortedList.filter(item => item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
      : this.sortedList;
  }

  private get sortedList(): Cat[] {
    return _.orderBy(this.state.catList, ['disabled','lastEditTime'], ['asc','asc']);
  }

  private get listFromStorage(): Cat[] {
    const sessionList = sessionStorage.getItem(this.LIST_STORAGE_KEY);

    return sessionList ? JSON.parse(sessionList) : [];
  }

  private getCatIndexById(id: number): number {
    return this.state.catList.findIndex(item => item.id === id)
  }

  private toggleDisable(catId: number): void {
    const catIndex = this.getCatIndexById(catId);
    const catList = [...this.state.catList];
    catList[catIndex].disabled = !catList[catIndex].disabled;
    catList[catIndex].lastEditTime = new Date();
    this.saveListToStorage(catList);
    this.setState({catList});
  }

  private findCats(event: SyntheticEvent<HTMLInputElement>): void {
    this.setState({searchTerm: event.currentTarget.value});
  }

  private saveListToStorage(catList:Cat[]) {
    const json = JSON.stringify(catList);
    sessionStorage.setItem(this.LIST_STORAGE_KEY, json);
  }

  render() {
    return (
      <>
        <input className="search-box" type="text" placeholder="Input name to find items" onInput={this.findCats}/>
        <div className="list-container">
          {
            this.catList.map((item, index) =>
              <Item key={index}
                    catElement={item}
                    updateInfo={this.props.updateInfo}
                    toggleItemDisable={this.toggleDisable}/>
            )
          }
        </div>
      </>
    )
  }
}
