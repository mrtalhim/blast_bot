import requests
import os
import time
from dotenv import load_dotenv
import random

load_dotenv()
token = os.environ.get('API_KEY')
headers = {'Authorization': f"Bearer {token}"}
template = {
    "phone_number":"085320119475",
    "message":
"""UJIAN KHUDDAM

~Assalamualaikum wr wb~, 
Yth *Seluruh Anggota Khuddam.*

Kami informasikan Ujian Khuddam Bulan Juli 2023, kerjain yuk 😊 Deadlinenya sampai tanggal 31 Juli 2023 pukul 23.59 ya📝

link ujiannya:
https://mkai.dcidn.com/ujian

Referensi buku yang digunakan pada ujian kali ini diambil dari:
1. Buku Buku Karakteristik Orang-Orang Shalih (Siratul Abdal) hal. 5-11 karya Hadhrat Mirza Ghulam Ahmad a.s.
Link buku: https://bit.ly/SiratulAbdal

Ayo isi ujian!
Selamat mengerjakan yaa!


Yang Lemah
_Muhtamim Ta‘lim_"""
}

def send(message, header=headers):
    api_url = "http://localhost:3000/message"
    print("sending...")
    time.sleep(random.randrange(3,10))
    response = requests.post(api_url, json=message, headers=header)
    return response.status_code

d = {x:x for x in range(10)}

def sendBulk(message, header=headers):
    for k in d.values():
        message_tmp = {
            'phone_number': k,
            'message': message
        }
    send(message=message_tmp, header=header)

if __name__ == '__main__':
    send(message=template, header=headers)