"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { changeTheme, defaultThemes } from "@/app/theme";

// htmlタグのCSS変数とcolor-schemeの値をセット（楽観更新）
/*
 * TODO: API通す、またはformのsubmitなど通してサーバー側のusersテーブルにtheme_idとして保存（これだけでは正規化しないほうがいいのかなと思うので）
 * 失敗したらクライアント側で元のテーマに戻す
 */
const setAppTheme = (theme: string) => changeTheme(theme);

export function ThemeToggle(): JSX.Element {
  const themes = defaultThemes.map((theme) => theme.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => {
              setAppTheme(theme);
            }}
          >
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
