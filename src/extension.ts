'use strict';

import * as vscode from 'vscode';
import { Settings } from './settings';
import fs = require('fs');
import Window = vscode.window;
import QuickPickItem = vscode.QuickPickItem;
import QuickPickOptions = vscode.QuickPickOptions;
import Document = vscode.TextDocument;
import Position = vscode.Position;
import Range = vscode.Range;
import Selection = vscode.Selection;
import TextDocument = vscode.TextDocument;
import TextEditor = vscode.TextEditor;
import Workspace = vscode.workspace;

export function activate(context: vscode.ExtensionContext) {

    var settings = new Settings();

    if(!settings.Enabled)
    {
        console.log("The extension \"randomeverything\" is disabled.");
        return;
    }

    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.int', insertRandomInt));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.float', insertRandomFloat));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.letters', insertRandomLetters));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.lettersAndNumbers', insertRandomLettersAndNumbers));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.country', insertRandomCountry));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.word', insertRandomWord));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.text', insertRandomText));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.date', insertRandomDate));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.cpf', insertRandomCPF));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.cnpj', insertRandomCNPJ));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.firstName', insertRandomFirstName));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.lastName', insertRandomLastName));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.fullName', insertRandomFullName));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.email', insertRandomEmail));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.url', insertRandomUrl));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.hexColor', insertRandomHexColor));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.iPv4Address', insertRandomIPv4Address));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.iPV6Address', insertRandomIPV6Address));
    context.subscriptions.push(vscode.commands.registerCommand('randomeverything.guid', insertRandomGUID));

}

function insertRandomInt(): void {

    var max:number;
    var min:number;

    Window.showInputBox({prompt: "Please enter [MIN-MAX]", value:"1-100"}).then(
        function(txt){
            if(txt){
                var args = txt.split("-");

                min = Number.parseInt(args[0]);
                max = Number.parseInt(args[1]);

                if(args.length != 2 || isNaN(min) || isNaN(max))
                {
                    //@TODO: Error handling practices for vscode extensions
                    Window.showErrorMessage("Invalid format.");
                    return;
                }
                processSelection(randomIntString, [min, max]);
            }
    });
}

function insertRandomFloat(): void {

    var max:number;
    var min:number;

    Window.showInputBox({prompt: "Please enter [MIN-MAX]", value:"1-100"}).then(
        function(txt){
            if(txt){
                var args = txt.split("-");

                min = Number.parseInt(args[0]);
                max = Number.parseInt(args[1]);

                if(args.length != 2 || isNaN(min) || isNaN(max))
                {
                    //@TODO: Error handling practices for vscode extensions
                    Window.showErrorMessage("Invalid format.");
                    return;
                }
                processSelection(randomFloatString, [min, max]);
            }
    });
}

function insertRandomLetters(): void {
    processSelection(randomLetters, []);
}

function insertRandomLettersAndNumbers(): void {
    processSelection(randomLettersAndNumbers, []);
}

function insertRandomCountry(): void {
    processSelection(randomCountry, [true]);
}

function insertRandomWord(): void {
    processSelection(randomWord, []);
}

function insertRandomText(): void {
    processSelection(randomText, []);
}

function insertRandomDate(): void {
    processSelection(randomDate, []);
}

function insertRandomCPF(): void {
    processSelection(randomCPF, []);
}

function insertRandomCNPJ(): void {
    processSelection(randomCNPJ, []);
}

function insertRandomFirstName(): void {
    processSelection(randomName, ['first']);
}

function insertRandomLastName(): void {
    processSelection(randomName, ['last']);
}

function insertRandomFullName(): void {
    processSelection(randomName, ['full']);
}

function insertRandomEmail(): void {
    processSelection(randomEmail, []);
}

function insertRandomUrl(): void {
    processSelection(randomUrl, []);
}

function insertRandomHexColor(): void {
    processSelection(randomColor, []);
}

function insertRandomIPv4Address(): void {
    processSelection(randomIP, ['ipv4']);
}

function insertRandomIPV6Address(): void {
    processSelection(randomIP, ['ipv6']);
}

function insertRandomGUID(): void {
    processSelection(randomGUID, []);
}

/**
 * Chance.js Wrappers
 */
function randomIntString(min, max): string{
    var chance = require('chance').Chance();
    var randomVar:Number = chance.integer({min: min, max: max});

    return randomVar.toString();
}

function randomFloatString(min, max): string{
    var chance = require('chance').Chance();
    var randomVar:Number = chance.floating({min: min, max: max});

    return randomVar.toString();
}

function randomLetters(min, max): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.string({pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"});

    return randomVar;
}

function randomLettersAndNumbers(min, max): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.string({pool: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"});

    return randomVar;
}

function randomCountry(isFull:boolean): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.country({ full: isFull });

    return randomVar;
}

function randomWord(): string{
    var chance = require('chance').Chance();
    let extensionPath = vscode.extensions.getExtension("helixquar.randomeverything").extensionPath;
    var strings = fs.readFileSync(extensionPath + "/assets/words.short.txt")
                    .toString()
                    .split("\r\n");
    var randomVar:string = chance.pickone(strings);

    return randomVar;
}

function randomText(): string{
    var chance = require('chance').Chance();
    let extensionPath = vscode.extensions.getExtension("helixquar.randomeverything").extensionPath;
    var strings = fs.readFileSync(extensionPath + "/assets/words.short.txt")
                    .toString()
                    .split("\r\n");
    var randomVar: string[] = chance.pickset(strings, 24);

    return randomVar.join(' ');
}

function randomDate(): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.date({string: true});

    return randomVar;
}

function randomCPF(): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.cpf();

    return randomVar;
}

function randomCNPJ(): string{
    var n = 9;
    var n1  = gera_random(n);
    var n2  = gera_random(n);
    var n3  = gera_random(n);
    var n4  = gera_random(n);
    var n5  = gera_random(n);
    var n6  = gera_random(n);
    var n7  = gera_random(n);
    var n8  = gera_random(n);
    var n9  = 0;//gera_random(n);
    var n10 = 0;//gera_random(n);
    var n11 = 0;//gera_random(n);	
    var n12 = 1;//gera_random(n);		
    var d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
    d1 = 11 - ( mod(d1,11) );
    if (d1>=10) d1 = 0;
    var d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
    d2 = 11 - ( mod(d2,11) );
    if (d2>=10) d2 = 0;

    return ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2;
}

function randomName(format?:any): string{
    var chance = require('chance').Chance();
    var randomVar:string;

    switch(format)
    {
        case 'first':
            randomVar = chance.first();
            break;
        case 'last':
            randomVar = chance.last();
            break;
        case 'full':
        default:
            randomVar = chance.name();
            break;
    }

    return randomVar;
}

function randomEmail(): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.email();

    return randomVar;
}

function randomUrl(): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.url();

    return randomVar;
}

function randomColor(): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.color({format: 'hex'});

    return randomVar;
}

function randomIP(option?:string): string{
    var chance = require('chance').Chance();
    var randomVar:string;

    switch (option) {
        default:
        case 'ipv4':
            randomVar = chance.ip();
            break;
        case 'ipv6':
            randomVar = chance.ipv6();
            break;
    }

    return randomVar;
}

function randomGUID(): string{
    var chance = require('chance').Chance();
    var randomVar:string = chance.guid();

    return randomVar;
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function gera_random(n) {
    var ranNum = Math.round(Math.random()*n);
    return ranNum;
}

function mod(dividendo,divisor) {
    return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
}

// This function takes a callback function for the text formatting 'formatCB'
function processSelection(formatCB, argsCB) {

    let e = Window.activeTextEditor;
    let d = e.document;
    let sel = e.selections;

    e.edit(function (edit) {
        // iterate through the selections
        for (var x = 0; x < sel.length; x++) {
            let txt: string = d.getText(new Range(sel[x].start, sel[x].end));

            if (argsCB.length > 0) {
                txt = formatCB.apply(this, argsCB);
            } else {
                txt = formatCB();
            }

            //insert the txt in the start of the current selection
            edit.insert(sel[x].start, txt);
        }
    });
}