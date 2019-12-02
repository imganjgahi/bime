import React from 'react';
import Button from '../../Utils/Buttons/Button';
interface IProps {
    onSubmit: (values: any, err: any) => void;
    reset?: boolean;
    id?: string;
}
interface IState {
    [key: string]: any;
    iscreated: boolean;
}

export default class Form extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {

            iscreated: false
        };
    }

    itemValidation = (name: string, value: string, rules: any) => {
        let isValid = true;
        let msg = ""
        const err = this.state.err;
        rules.forEach((rule: any) => {
            if (rule.required && isValid) {
                isValid = value.trim() !== ""
                if (!isValid) {
                    msg = rule.msg;
                }
                err[name] = { msg, isValid }
            }
            if (rule.max && isValid) {
                isValid = value.length <= rule.max
                if (!isValid) {
                    msg = rule.msg
                }
                err[name] = { msg, isValid }
            }
        });
        this.setState({ err })
        return isValid
    }

    componentDidMount() {
        // const elements = this.getChild()
        // this.setState({elements})
        this.setStateValues();
    }
    componentDidUpdate(pervProps: any, pervState: any) {
        if (pervProps !== this.props) {
            this.setStateValues();
        }
        if (pervProps.reset !== this.props.reset) {
            this.setState({ data: {} }, () => {    
                this.setStateValues(true);
            })
        }
    }

    private childChangeHandler = (name: string, e: any, rules: any) => {
        let value = e;
        if (e.target) {
            value = e.target.value
        }

        this.setState({ data: { ...this.state.data, [name]: value } })
        if (rules) {
            this.itemValidation(name, value, rules);
        }
    }

    setStateValues = (isReset = false) => {
        let data: any = {}
        let err: any = {}
        let rules: any = {}

        React.Children.map(this.props.children, (child: any, index) => {
            if (child && child.type === FormItem) {
                // data[child.props.name] = this.state.data && this.state.data[child.props.name] ? this.state.data[child.props.name] : child.props.initialValue ? child.props.initialValue : ""
                if (child.props.rules) {
                    rules[child.props.name] = child.props.rules
                }

                if(isReset){
                    data[child.props.name] = ""
                } else if(this.state.data && this.state.data[child.props.name]){
                    data[child.props.name] =  this.state.data[child.props.name]
                } else if (child.props.initialValue && !this.state.iscreated){
                    data[child.props.name] = child.props.initialValue
                } else {
                    data[child.props.name] = ""
                }


                //initial state.err
                // if(this.state.err && this.state.err[child.props.name]){
                //     err[child.props.name] =  this.state.err[child.props.name]
                // }else { 
                    err[child.props.name] = { msg: "", isValid: false }
                // }

                
            }
        });
        this.setState({
            data,
            err,
            rules,
            iscreated: true
        })
    }
    getChild = () => {
        var items = React.Children.map(this.props.children, (child: any, index: number) => {
            if (child && child.type === FormItem) {
                var comp = child.props.component;
                const initialElement = {
                    id: comp.props.id ? comp.props.id : child.props.name,
                    name: child.props.name,
                    className: comp.props.className,
                    initialValue: child.props.initialValue ? child.props.initialValue : "",
                    onChange: (e: any) => {
                        if (comp.props.onChange) {
                            comp.props.onChange(e)
                        }
                        this.childChangeHandler(child.props.name, e, child.props.rules)
                    },
                    value: this.state.data && this.state.data[child.props.name] ? this.state.data[child.props.name] : ""
                }
                if (initialElement.initialValue === "") {
                    delete initialElement.initialValue
                }
                const El = React.cloneElement(comp, initialElement, null);
                return <FromItemWrapper
                    data = {this.state.data}
                    label={child.props.label}
                    id={comp.props.id ? comp.props.id : child.props.name}
                    name={child.props.name}
                    itemElement={El}
                    err={this.state.err && this.state.err[child.props.name] ? this.state.err[child.props.name].msg : null} />
            }
            else if (child && child.type === Button) {
                return child
            }
        });
        return items;
    }

    onFormSubmit = (event: any) => {
        event.preventDefault();
        const { data, rules } = this.state
        let err: any = {}
        let isValid = true;
        for (const item in rules) {
            let localValidation = false;
            if (isValid) {
                isValid = this.itemValidation(item, this.state.data[item], this.state.rules[item])
            }
            localValidation = this.itemValidation(item, this.state.data[item], this.state.rules[item])
            if (!localValidation) {
                err[item] = this.state.err[item]
            }

        }
        if (isValid) {
            err = null
        }
        this.props.onSubmit(data, err);
    }

    render() {
        const elements = this.getChild();
        return (
            <form id={this.props.id} onSubmit={this.onFormSubmit}>
                {elements}

                <button id="formBtnSubmit" style={{ display: "none" }} />
            </form>
        )
    }
}

const FromItemWrapper = (props: any) => {
    return (
        <div className="itemWrapper">
            {props.label && <label className="fildesLabel" htmlFor={props.id}>{props.label}</label>}
            {props.itemElement}
            {props.err && <small className="validationError"> {props.err} </small>}
        </div>
    )
}

export class FormItem extends React.Component<any, any>{ }