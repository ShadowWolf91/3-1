﻿#include <iostream>
#include <Windows.h>
#include "ErrorHandling.h"
#include <tchar.h>

#define BUFSIZE 512

using namespace std;

int main()
{
	DWORD  cbRead, cbToWrite, cbWritten;
	TCHAR  chBuf[BUFSIZE];
	TCHAR checkBuf[BUFSIZE] = TEXT("");
	BOOL   fSuccess = FALSE;

	HANDLE hPipe; // дескриптор канала

	bool multi = true; //////////////////////////////////////

	try
	{
		do
		{
			if ((hPipe = CreateNamedPipe(TEXT("\\\\.\\pipe\\Tube"), //символическое имя канала
				PIPE_ACCESS_DUPLEX, //дуплексный канал;  атрибуты канала
				PIPE_TYPE_MESSAGE | PIPE_WAIT, // сообщения|синхронный; режимы передачи данных
				1, NULL, NULL, // максимум 1 экземпляр; макс. к-во экземпляров канала; размер выходного буфера;  размер входного буфера
				INFINITE, NULL)) == INVALID_HANDLE_VALUE) //время ожидания связи с клиентом; атрибуты безопасности
				throw SetPipeError("create:", GetLastError());

			cout << "Waiting.." << endl;

			if (!ConnectNamedPipe(hPipe, NULL)) // ожидать клиента; дескриптор именованного канала
				//используется для асинхр.связи
				throw SetPipeError("connect:", GetLastError());

			cout << "Connected!" << endl;

			//..................................................................
			do
			{
				do
				{
					fSuccess = ReadFile(
						hPipe, // pipe handle
						chBuf, // buffer to receive reply
						BUFSIZE * sizeof(TCHAR), // size of buffer
						&cbRead, // number of bytes read
						NULL); // not overlapped
				} while (!fSuccess);

				if (!fSuccess)
				{
					throw SetPipeError("readfile:", GetLastError());
				}

				if (!wcscmp(chBuf, checkBuf)) {
					break;
				}

				_tprintf(TEXT("%s\n"), chBuf);

				//..................................................................

				cbToWrite = (lstrlen(chBuf) + 1) * sizeof(TCHAR);

				fSuccess = WriteFile(
					hPipe, // pipe handle
					chBuf, // message
					cbToWrite, // message length
					&cbWritten, // bytes written
					NULL); // not overlapped

				if (!fSuccess)
				{
					throw SetPipeError("writefile:", GetLastError());
				}

			} while (wcscmp(chBuf, checkBuf) && multi);

			cout << "Disconnected" << endl;

			DisconnectNamedPipe(hPipe);
			CloseHandle(hPipe);
		} while (true);
	}
	catch (string ErrorPipeText)
	{
		cout << endl << ErrorPipeText;

		//DisconnectNamedPipe(hPipe);
		//CloseHandle(hPipe);
	}

}