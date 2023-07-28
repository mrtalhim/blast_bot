import PySimpleGUI as sg
from app import send

layout = [
    [sg.Text('nomor'), sg.InputText(key='NUMBER')],
    [sg.Text('pesan'), sg.Multiline(expand_y=True, key='MESSAGE')],
    [sg.Button('Kirim', key='SEND'), sg.Button('Keluar', key='EXIT')],
    [sg.Text('Tekan kirim')]
]
window = sg.Window('Progress Bar', layout, size=(500, 500))

while True:
    event, values = window.read()
    print(event, values)
    if event == 'SEND':
        message={
            'phone_number':values['NUMBER'],
            'message':values['MESSAGE']
        }
        send(message=message)
    if event == sg.WIN_CLOSED or event == 'EXIT':
        break

window.close()