import * as React from 'react';

export interface IProps {
    optionList?: any[];
    url?: string;
    onChange?: any;
    displayProp?: string;
    valueProp?: string;
    initialValue?: string;
    authorization?: string;
    value?: string;
}

export interface IState {
    displayValue: any[];
    searchValue: string;
    value: any[];
    showOption: boolean;
    showInput: boolean;
    activeItem: number;
    optionList: any[];
}

class MultiSelect extends React.Component<IProps, IState> {
    ref: any;
    optionRef: any;
    optionContainer: any;
    constructor(props: IProps) {
        super(props);
        this.state = {
            displayValue: [],
            searchValue: "",
            value: [],
            showOption: false,
            showInput: true,
            activeItem: -1,
            optionList: []
        };
        this.ref = React.createRef()
        this.optionRef = React.createRef();
        this.optionContainer = React.createRef();
    }

    getOptions = (url: string) => {
        let authorization: string = "Bearer " + localStorage!.getItem("TickSho");
        if (this.props.authorization) {
            authorization = this.props.authorization
        }
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authorization,
            },
        })
            .then(response => response.json())
            .then(json => this.setState({ optionList: json }, () => {
                if (this.props.initialValue) {
                    this.setInitialValue(this.props.initialValue);
                }
            }))
    }

    hideOption = () => {
        this.setState({ showOption: false, searchValue: "", activeItem: -1 });
    }

    handleClickOutside = (e: any) => {
        if (this.optionRef.current && !this.optionRef.current.contains(e.target)) {
            this.hideOption()
        }
    }
    componentDidUpdate(prevProps: IProps) {
        if (this.props.value !== prevProps.value) {
            if(this.props.value){
                this.setInitialValue(this.props.value)
            } else {
                this.setState({ value: [], displayValue: [] })
            }
        } 
    }
    setInitialValue(initialValue: string) {
        const valueProp = this.props.valueProp ? this.props.valueProp : "id";
        const items: any[] = [];
        let displayValue: any[] = [];
        // if (this.props.initialValue !== undefined) {
        initialValue.toString().split(",").forEach((item: any) => {
            if (this.state.optionList.length > 0) {
                const valueItem = this.state.optionList.filter(
                    x => initialValue && x[valueProp].toString() ===
                        item.toString())
                if (valueItem && valueItem.length > 0) {
                    items.push(valueItem[0][valueProp])
                    displayValue.push(valueItem[0]);
                }
            }
        });
        console.log("displayValue: ", items, displayValue)
        this.setState({ value: items, displayValue })

        // }
    }
    componentDidMount() {
        if (this.props.url) {
            this.getOptions(this.props.url)
        } else if (this.props.optionList) {
            this.setState({ optionList: this.props.optionList }, () => {
                if (this.props.initialValue) {
                    this.setInitialValue(this.props.initialValue);
                }
            })
        }
        document.addEventListener("mousedown", this.handleClickOutside);
        this.moveFocus()
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    _handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && this.state.activeItem >= 0) {
            e.preventDefault();
            if (this.props.optionList) {

                const displayProp = this.props.displayProp ? this.props.displayProp : "title";
                const valueProp = this.props.valueProp ? this.props.valueProp : "id";
                const matchData = this.state.searchValue.toLocaleLowerCase().trim()
                const datas = this.props.optionList.filter(data => data[displayProp].toLocaleLowerCase().trim().match(matchData));
                if (datas && datas[this.state.activeItem]) {
                    const id = datas[this.state.activeItem][valueProp].toString();
                    const targetData = datas.filter(data => data[valueProp].toString() === id)[0]
                    this.onSelectHandler(targetData)
                }
            }
        }
    }
    moveFocus() {
        const displayProp = this.props.displayProp ? this.props.displayProp : "title";
        const node = this.ref.current;
        node.addEventListener('keydown', (e: any) => {
            const matchData = this.state.searchValue.toLocaleLowerCase().trim()
            const items: any[] = this.props.optionList ? this.props.optionList.filter(data => data[displayProp].toLocaleLowerCase().trim().match(matchData)) : [];
            let activeIndex = this.state.activeItem
            if (e.keyCode === 40 && activeIndex < (items.length - 1)) {
                activeIndex++
            }
            if (e.keyCode === 38 && activeIndex > 0) {
                activeIndex--
            }
            this.setState({ activeItem: activeIndex })
        });
    }

    optionHandler = (status: boolean) => {
        this.setState({ showOption: status, showInput: true, searchValue: "" }, () => {
            this.ref.current && this.ref.current.focus()
        })
    }

    onSelectHandler = (data: any) => {
        const valueProp = this.props.valueProp ? this.props.valueProp : "id";
        const displayList = this.state.displayValue;
        const values = this.state.value;
        const hasOne = this.state.displayValue.some(item => item[valueProp].toString() === data[valueProp].toString());
        if (!hasOne) {
            displayList.push(data);
            values.push(data[valueProp].toString())
        }
        this.ref.current && this.ref.current.focus()
        this.setState({ value: values, displayValue: displayList }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value.join(","))
            }
        })
    }



    onChangeHandler = (event: any) => {
        event.preventDefault();
        this.setState({ searchValue: event.target.value, activeItem: 0 })
    }
    unselectItem = (item: any) => {
        const valueProp = this.props.valueProp ? this.props.valueProp : "id";
        const selectedList = this.state.displayValue;
        const newSelectedList = selectedList.filter(selected => selected[valueProp].toString() !== item[valueProp].toString())
        const newValues = this.state.value.filter(selected => selected !== item[valueProp].toString())
        this.setState({ value: newValues, displayValue: newSelectedList }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value.join(","))
            }
        })
    }
    focusHandler = () => {
        this.setState({ showOption: true })
    }
    render() {
        const displayProp = this.props.displayProp ? this.props.displayProp : "title";
        const valueProp = this.props.valueProp ? this.props.valueProp : "id";
        let datas = this.state.optionList ? this.state.optionList : [];
        if (this.state.searchValue !== "" && this.state.optionList.length > 0) {
            const matchData = this.state.searchValue.toLocaleLowerCase().trim()
            datas = datas.filter(data => data[displayProp].toLocaleLowerCase().trim().match(matchData));
        }
        return (
            <div className="multiContainer" ref={this.optionRef}>
                <div className="multiDisplayContainer" onClick={() => this.optionHandler(true)}>
                    {this.state.displayValue.length > 0 && this.state.displayValue.map((item, i) => {
                        return (
                            <div key={i} className="multiDisplayItem">
                                <div className="multiselectItem"> {item[displayProp]} </div>
                                <div className="multiUnselect" onClick={() => this.unselectItem(item)}>x</div>
                            </div>
                        )
                    })}
                    <input
                        tabIndex={0}
                        // onBlur={this.hideOption}
                        style={{
                            display: this.state.showInput ? "block" : "none",
                            width: this.state.searchValue.length === 0 ? "19px" : (this.state.searchValue.length * 9) + "px"
                        }}
                        onFocus={this.focusHandler}
                        onKeyDown={this._handleKeyDown}
                        ref={this.ref} type="text" className="multiSearchInput"
                        onChange={this.onChangeHandler}
                        value={this.state.searchValue} />
                </div>
                <div className={this.state.showOption ? "multiDataList" : "multiDataList optionHide"} ref={this.optionContainer} tabIndex={-1}>
                    {datas.length > 0 ? datas.map((data, i) => {
                        const isSelected = this.state.displayValue.some(selectedItem => selectedItem[valueProp].toString() === data[valueProp].toString())
                        return (
                            <div key={i} id={data[valueProp].toString()}
                                className={
                                    i === this.state.activeItem
                                        ? "multiSelectOption multiOptionActive" :
                                        isSelected ? " multiSelectOption multiSelectedItem" :
                                            "multiSelectOption"}
                                onClick={() => this.onSelectHandler(data)}>
                                {data[displayProp]}
                            </div>
                        )
                    }) : (
                            <div style={{ textAlign: "center", padding: "10px" }}>
                                <small> اطلاعاتی موجود نیست </small>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default MultiSelect;