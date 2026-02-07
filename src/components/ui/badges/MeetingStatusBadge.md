# MeetingStatusBadge

Enterprise-grade badge component untuk menampilkan status meeting dengan styling yang konsisten dan type-safe.

## Features

✅ **Type-safe** - Menggunakan TypeScript dengan strict typing  
✅ **Konsisten** - Styling yang seragam di seluruh aplikasi  
✅ **Customizable** - Support untuk size dan custom className  
✅ **Accessible** - Menggunakan HeroUI Chip sebagai base component

## Usage

### Basic Usage

```tsx
import { MeetingStatusBadge } from "@/components/ui/badges/MeetingStatusBadge";

// Terjadwal (Purple)
<MeetingStatusBadge status="scheduled" />

// Sedang Berlangsung (Red)
<MeetingStatusBadge status="live" />

// Selesai (Slate)
<MeetingStatusBadge status="completed" />
```

### With Custom Size

```tsx
<MeetingStatusBadge status="live" size="md" />
<MeetingStatusBadge status="scheduled" size="lg" />
```

### With Custom Styling

```tsx
<MeetingStatusBadge status="live" className="shadow-lg" />
```

## Props

| Prop        | Type                                   | Default | Description               |
| ----------- | -------------------------------------- | ------- | ------------------------- |
| `status`    | `"scheduled" \| "live" \| "completed"` | -       | Status meeting (required) |
| `size`      | `"sm" \| "md" \| "lg"`                 | `"sm"`  | Ukuran badge              |
| `className` | `string`                               | -       | Custom CSS classes        |

## Status Configuration

| Status      | Label              | Color            | Background      |
| ----------- | ------------------ | ---------------- | --------------- |
| `scheduled` | Terjadwal          | Purple (Primary) | `bg-primary/10` |
| `live`      | Sedang Berlangsung | Red (Danger)     | `bg-red-50`     |
| `completed` | Selesai            | Slate            | `bg-slate-50`   |

## Migration from Inline Chip

**Before:**

```tsx
<Chip
  color={getStatusColor(meeting.status) as any}
  variant="flat"
  size="sm"
  className="font-bold capitalize px-2 h-7"
>
  {getStatusLabel(meeting.status)}
</Chip>
```

**After:**

```tsx
<MeetingStatusBadge status={meeting.status as any} />
```

## Benefits

1. **Maintainability** - Satu tempat untuk mengubah styling semua status badges
2. **Consistency** - Styling yang sama di seluruh aplikasi
3. **Type Safety** - TypeScript akan warning jika status tidak valid
4. **Cleaner Code** - Lebih readable dan less verbose
