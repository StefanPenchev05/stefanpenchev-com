import { describe, expect, it } from "vitest";
import { contactOptions } from "./contact";

describe("Public contact", () => {
  it("offers distinct employment and freelance enquiries to the approved address", () => {
    expect(contactOptions.map((option) => option.label)).toEqual([
      "Discuss a role",
      "Discuss a project",
    ]);
    const destinations = contactOptions.map((option) => new URL(option.href));
    expect(
      destinations.every(
        (url) => url.protocol === "mailto:" && url.pathname === "penchev.stefan@icloud.com",
      ),
    ).toBe(true);
    expect(new Set(destinations.map((url) => url.searchParams.get("subject"))).size).toBe(2);
    expect(contactOptions[0]!.detail).toContain("January 2027");
  });
});
